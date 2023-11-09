import { Octokit } from '@octokit/rest';
import { OctokitResponse } from '@octokit/types';
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
import { VFileMessage } from 'vfile-message';

import { OWNER } from './git.js';
import { Emoji, serializeTuple } from './utils.js';

export const pullRequestReviewComments: PullRequestComment[] = [];

export type PullRequestComment = {
  body: string;
  commit_id: string;
  column: number;
  line: number;
  path: string;
  position: number;
  pull_number: number;
  repository: string;
  subject_type?: 'line' | 'file';
};

export interface PulLRequestReplyComment extends PullRequestComment {
  comment_id: number;
}

export enum GitHubLabel {
  ChangesRequested = 'changes requested',
  Inappropriate = 'inappropriate',
}

/**
 * https://github.com/octokit/core.js#readme
 * https://github.com/octokit/rest.js#readme
 */
const octokit = new Octokit({
  auth: `${process.env.GITHUB_PAT}`,
  request: {
    fetch: fetch,
  },
});

// https://docs.github.com/en/rest/pulls/comments?apiVersion=2022-11-28#list-review-comments-on-a-pull-request
export const getExistingCommentsForPullRequest = async ({
  pull_number,
  repository,
}: {
  pull_number: number;
  repository: string;
}) => {
  return await octokit.rest.pulls.listReviewComments({
    owner: OWNER,
    repo: repository,
    pull_number,
  });
};

// https://docs.github.com/en/rest/pulls/comments?apiVersion=2022-11-28#create-a-reply-for-a-review-comment
export const postReplyToComment = async ({
  body,
  comment_id,
  pull_number,
  repository,
}: PulLRequestReplyComment) => {
  return await octokit.rest.pulls.createReplyForReviewComment({
    body,
    comment_id,
    owner: OWNER,
    pull_number,
    repo: repository,
  });
};

// https://docs.github.com/en/rest/pulls/comments?apiVersion=2022-11-28#create-a-review-comment-for-a-pull-request
export const postNewReviewComment = async ({
  body,
  commit_id,
  line,
  path,
  position,
  pull_number,
  repository,
  subject_type = 'line',
}: PullRequestComment) => {
  return await octokit.rest.pulls.createReviewComment({
    body,
    commit_id,
    line,
    owner: OWNER,
    path,
    position,
    pull_number,
    repo: repository,
    side: 'RIGHT',
    // @ts-ignore TypeScript wants "LINE" or "FILE", but that gives an error
    subject_type,
  });
};

// https://docs.github.com/en/rest/issues/labels?apiVersion=2022-11-28#add-labels-to-an-issue
// Use the issues API for labeling PRs
export const addLabelToIssue = async ({
  repository,
  issue_number,
  labels,
}: {
  repository: string;
  issue_number: number;
  labels: GitHubLabel[];
}) => {
  return await octokit.issues.addLabels({
    owner: OWNER,
    repo: repository,
    issue_number,
    labels,
  });
};

/**
 * Construct a new pull request comment and push it to the list
 */
export const createNewPullRequestComment = ({
  body,
  commit_id,
  line,
  path,
  pull_number,
  repository,
  subject_type,
}: {
  body: string;
  commit_id: string;
  line: number;
  path: string;
  pull_number: number;
  repository: string;
  subject_type?: 'line' | 'file';
}) => {
  const comment: PullRequestComment = {
    body,
    commit_id,
    column: line,
    line,
    path,
    position: line,
    pull_number,
    repository,
    subject_type,
  };
  pullRequestReviewComments.push(comment);
};

export const requiredCheckMessage = `${Emoji.NoEntry} This change is a requirement. Please fix it before merging.`;

export const suggestedCheckMessage = `${Emoji.Bulb} This change is a suggestion but not a requirement.`;

export const automatedMessageDisclaimer = `${Emoji.RobotFace} The feedback in this comment is automated and might be incorrect.`;

/**
 * Construct a new pull request comment for a given VFileMessage and
 * other essential information
 */
export const getNewPullRequestCommentForVFileMessage = ({
  commit_id,
  isRequiredCheck,
  message,
  pull_number,
  path,
  repository,
}: {
  commit_id: string;
  isRequiredCheck: boolean;
  message: VFileMessage;
  path: string;
  pull_number: number;
  repository: string;
}): PullRequestComment => {
  let commentBody = `${
    message.source && message.url
      ? `The content quality check [${message.source}](${message.url}) says: `
      : `The content quality check says: `
  }${message.reason ? message.reason + '\n' : ''}
${message.note ? message.note.split(' (source: ')[0] + '\n' : ''}
${isRequiredCheck ? requiredCheckMessage : suggestedCheckMessage}
${automatedMessageDisclaimer}`;
  const comment = {
    body: commentBody,
    commit_id,
    column: message.column ?? 1,
    line: message.line ?? 1,
    path,
    position: message.line ?? 1,
    pull_number,
    repository,
  };
  return comment;
};

/**
 * Check if an existing comment with the same path, line, and body exists
 */
export const doesCommentExist = ({
  existingPullRequestComments,
  comment,
}: {
  existingPullRequestComments: OctokitResponse<any>;
  comment: PullRequestComment;
}): boolean => {
  return existingPullRequestComments.data.some(
    (existingComment: { body: string; line: number; path: string }) => {
      return (
        existingComment.body === comment.body &&
        existingComment.line === comment.line &&
        existingComment.path === comment.path
      );
    }
  );
};

interface IPostPullRequestComments {
  pullRequestReviewComments: PullRequestComment[];
  pull_number: number;
  repository: string;
}

/**
 * Post pull request comments given list of comments and pull request number
 * @param param0
 */
export const postPullRequestComments = async ({
  pullRequestReviewComments,
  pull_number,
  repository,
}: IPostPullRequestComments) => {
  console.log('📝 Posting pull request review comments');
  const commentIdMap = new Map<string, number>();

  console.log('::group::Getting existing comments for pull request');
  const existingPullRequestComments = await getExistingCommentsForPullRequest({
    pull_number,
    repository,
  });
  console.log(existingPullRequestComments);
  existingPullRequestComments.data.forEach((element: any) => {
    commentIdMap.set(serializeTuple(element.path, element.line), element.id);
  });
  console.log('Comments map', commentIdMap);
  console.log('::endgroup::');

  for (const comment of pullRequestReviewComments) {
    try {
      console.log(
        `::group::Posting comment for ${comment.path}, line ${comment.line}, column ${comment.column}`
      );
      const commentKey = serializeTuple(comment.path, comment.line);
      const commentThreadId = commentIdMap.get(commentKey);
      const commentExists = doesCommentExist({
        existingPullRequestComments,
        comment,
      });

      if (commentExists) {
        console.log(
          `⏭️  A comment already exists for ${comment.path}, line ${comment.line} with the following message:\n\n${comment.body}`
        );
      } else if (commentThreadId) {
        console.log('🧵 Posting reply to existing comment thread');
        const replyResponse = await postReplyToComment({
          ...comment,
          comment_id: commentThreadId,
        });
        console.log(replyResponse);
        console.log(
          `${Emoji.WhiteCheckMark} Posted reply to ${replyResponse.data.path}, line ${replyResponse.data.line}. Comment id: ${replyResponse.data.id}`
        );
      } else {
        console.log('🗣️ Posting new review comment');
        const newResponse = await postNewReviewComment(comment);
        console.log(newResponse);
        commentIdMap.set(commentKey, newResponse.data.id);
        console.log(
          `${Emoji.WhiteCheckMark} Posted new comment to ${newResponse.data.path}, line ${newResponse.data.line}. Comment id: ${newResponse.data.id}`
        );
      }
    } catch (e) {
      console.log('❌ Error posting', comment, e);
    } finally {
      console.log('::endgroup::');
    }
  }
};
