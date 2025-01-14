---
title: Plan for educational settings
description: Covers how to design educational games and experiences for classes and teachers. Includes information on user needs, common devices found in schools, and unique considerations like safety.
---

Designing a Roblox experience for a classroom is similar to designing for traditional audiences - with a few additional considerations. When creating a game design document for education, there are differing user needs and classroom logistics to account for. This article covers both the processes and considerations for designing educational experiences on the Roblox platform for use within K-12 American classrooms.

<Alert severity='info'>
Note that this document will focus on design considerations for usage within a traditional school classroom, and may not apply to experiences meant for supplemental education, edutainment, or adult education markets.
</Alert>

## Plan an education experience

During the planning stages of the experience, designers need to identify what learning standards will be utilized within the experience, and then how the usage of those learning standards will be communicated to teachers.

These steps, though not in the traditional game design process, ensure that learning is built into a core game loop and that educators understand how to utilize an experience in the classroom.

### Start with learning standards

Many game designers start with a mechanic or idea. Educational game designers, instead, start with learning standards and objectives, then create gameplay that supports the learning.

Learning standards are concise descriptions of what a student is expected to know or do, such as: _"Apply Newton's Third Law to design a solution to a problem involving the motion of two colliding objects"_.

In practice, standards are adopted by states and determine what concepts a teacher must cover in class. For teachers to adopt learning tools into their classroom, that tool will often need to adhere to specific standards sought by that educator.

An example of a science learning standard is below.

<table>
<thead>
<tr>
<th>Disciplinary core idea</th>
<th>Learning standard</th>
<th>Standard description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Motion and Stability: Forces and Interactions</td>
<td><a href="https://www.nextgenscience.org/pe/ms-ps2-1-motion-and-stability-forces-and-interactions">MS-PS2-1</a></td>
<td>Apply Newton's Third Law to design a solution to a problem involving the motion of two colliding objects</td>
</tr>
</tbody>
</table>

<Alert severity='info'>
Learning standards vary state-by-state, and even by country. For example, different states may teach Newtonian physics in different ways, but will share universal content similarities. For more details on locating relevant learning standards, a list of institutions offering standards is listed in [Additional Resources](#additional_resources).
</Alert>

### Define learning standards

Within the design process for an educational experience, standards will serve as inspiration for game mechanics, and be crucial parts of a core game loop. For a designer, to define the standards which will be used, we recommend the following:

1. Determine the **topic** to cover, such as gravity, geometry, or climate change and the **target age range** of your experience, such as middle school or 10th grade. This will inform where to research learning standards.

   Example: _High school physics_

2. Identify learning standards(s) for the experience. For more on this topic, see [Further Reading](#further-reading).

   _Example: [HS-PS2-1](https://www.nextgenscience.org/pe/hs-ps2-1-motion-and-stability-forces-and-interactions): Analyze data to support the claim that Newton's second law of motion describes the mathematical relationship among the net force on a macroscopic object, its mass, and its acceleration._

   <Alert severity='info'>
   The learning standard above is from the institution Next Generation Science Standards. Viewing the standard provides more detail on how to implement it in classrooms, which can serve as inspiration for gameplay.
   </Alert>

### Connect learning with gameplay

Once you identify a learning standard, you may proceed by establishing learning objectives. A **learning objective** defines what users should know or be able to do after finishing that experience.

Objectives are **specific** and **measurable**. When written, the objective breaks down a broad topic, like genetics in biology, into discrete components such as Punnett squares and recessive genes. Additionally, each objective should show how a student demonstrates that knowledge, often by how they are able to describe specific concepts or analyze situations.

To continue the design process, we recommend the following:

1. Write **learning objective(s)** for the experience that align with the learning standard.

   _Example: After completing the experience, users will be able to determine the probability of offspring with specific and desired traits._

2. Create **situations and core game loops** that require players to **demonstrate their understanding** in order to progress. Use inspiration from the standards and objectives to elicit joy, such as playful situations and narrative.

   _Example: In-game, students strategize to breed pets for competitions by deciding which dominant and recessive traits will be prominent in offspring._

3. Continue to complete a design document following a traditional game design process.

### Release to educators

After a design document is completed, there are additional considerations for releasing the experience in classrooms. Educators must understand how an experience helps their students learn, and how best to launch it in their classroom.

1. Determine how the experience's learning standards and objectives will be to communicated to educators. This can be accomplished by listing the standards and objectives on an external website, on a game page, or any educator marketing materials.

2. Plan to provide **supplemental resources** to educators. For example, partner with an educator to write a lesson plan or video to help educators understand how to implement the experience in a classroom. Teachers need to understand how much time an activity will take. It can also be helpful to provide example discussion questions to frame the experience for students. Guides can be found in [Further Reading](#further-reading).

## Identify user needs

It is important to balance the requirements of educators with the students' desire for fun and engaging experiences. Use the needs for educators and students listed below as best practices to guide the development of your design document. Note that the needs are universal across all ages, unless stated otherwise.

### Educator needs

Educators favor games and experiences that in addition to aligning to educational standards and grade levels, also present few barriers to entry. Teachers need to be able to jump into an experience quickly, with little tutorials..

#### Make design easy to pick up

Educators have precious little time to plan, so new classroom tools must be easy to adopt. As such, we recommend the following practices within the experience itself:

- **Use Familiar User Interface (UI) Patterns** - If possible, research similar learning games or educational products used by educators.
- **Reduce Text, Add Visuals** - Keep explanations simple and visual. When possible, use icons and commonly understood symbols to replace text.
- **Avoid Jargon** - Use simple, jargon-free terminology, especially in terms of vocabulary common in gaming. Very few educators understand common "gamer terms" like W-A-S-D but everyone knows arrow keys on a keyboard.

#### Design for collaboration and accessibility

Educators appreciate activities that engage their students and meet their students' diverse needs.

- **Foster Collaboration** - Educators often desire opportunities for students to interact and collaborate. Find ways to make solitary gameplay collaborative, such as encouraging students to discuss and solve a shared problem.
- **Design for Accessibility** - Many schools require accessibility features, such as color contrasts for visually impaired students. To learn more, read our [Accessibility](../../production/publishing/accessibility.md) article.

### Student needs

Besides meeting educator needs, an experience should be engaging and rewarding to students.

#### Design for exploration, not memorization

Students learn best when engaged in open-ended exploration that provides meaningful choices. When designing the core loop, ensure students have voice and choice in their decisions. If students can solve problems through rote memorization, they may become bored.

For example, imagine a game where students are playing a golf-inspired game on different planets to understand physics.

<table>
<tbody>
   <tr>
    <td><b>Lacks student agency</b></td>
    <td>Students input different numbers for a ball's acceleration and then press a button to see if the ball enters a goal. Learning is focused on trial and error.</td>
   </tr>
   <tr>
    <td><b>Provides student agency</b></td>
    <td>Students design a ball by modifying different attributes, such as its mass, material density, and add-ons like wings. They then position their avatar to hit the ball with a desired amount of force. Learning is focused on observation, reflection, and application of a theory, such as "Does more mass help?"</td>
   </tr>
</tbody>
</table>

#### Align to learning differences

A user's age will impact game design and user experience choices. When designing your experience, identify your target age range and research best practices for that group. Some concepts to research include cognitive differences, such as the complexity of subject matter, and motor skills.

To help conceptualize these differences, we provide some examples below. Please note that these differences are not exhaustive.

<table>
<thead>
   <tr>
    <th>Component</th>
    <th>8 - 12 year old</th>
    <th>12 - 15 year old</th>
   </tr>
</thead>
<tbody>
   <tr>
    <td><b>User interface</b></td>
    <td>Large and minimal GUI.</td>
    <td>GUI can follow standard commercial game conventions.</td>
   </tr>
   <tr>
    <td><b>Interactions</b></td>
    <td>Interactions should only take one hand. Keyboard usage should be minimal. </td>
    <td>Gestures can use both hands, such as using WASD and clicking with a mouse. </td>
   </tr>
   <tr>
    <td><b>Gameplay</b></td>
    <td>Gameplay should focus on one task at a time, like a simple quest.</td>
    <td>Gameplay can include having multiple, simultaneous tasks.</td>
   </tr>
</tbody>
</table>

For further research, we recommend the following resources.

- [Designing for Kids: Cognitive Considerations (NN/g, 2018)](https://www.nngroup.com/articles/kids-cognition/)
- [Design for Kids Based on Their Stage of Physical Development (NN/g, 2018)](https://www.nngroup.com/articles/children-ux-physical-development/)

<Alert severity='info'>
In general, the younger the student, the more impactful the age differences. Teaching a fourteen year old is similar to teaching an adult, while teaching a ten year old may be much different than teaching a nine year old.
</Alert>

#### Additional needs

When designing for students, traditional design principles still hold true as well. Some additional considerations are as follows:

- Students often avoid reading in-game text. Tutorials should be visual and quick. **Don't** rely on text screens to communicate important information.
- Provide positive reinforcement when students achieve goals. Reinforcement can be as simple as a burst of particle effects, or getting to playfully interact with an object. If students struggle in-game, provide encouragement and specific feedback on how they can improve.

## Understand the classroom

Although each educator's classroom is different, there are common themes that can inform your experience design.

### Educational contexts

Before designing an experience, identify the **educational context** where an experience might be used. Some common examples are below.

<table>
<thead>
   <tr>
    <th>Setting</th>
    <th>Common features</th>
   </tr>
</thead>
<tbody>
   <tr>
    <td><b>Whole group instruction</b></td>
   <td><ul>
   <li >An educator leads 20 to 35 students simultaneously through the same activity.</li>
   <li>Class times vary, but are generally 40 to 60 minutes. In that period, you may expect 5-10 minutes of setup (e.g. logging in) and 15-25 minutes of dedicated playtime.</li>
   <li><b>Example</b>: A class joins a 20 minute guided tour of ancient Rome. </li>
   </ul></td>
   </tr>
   <tr>
    <td><b>Group activities</b></td>
    <td>
    <ul>
      <li>Small groups of 3 to 8 students collaborating on an activity.</li>
      <li><b>Example</b>: Students are grouped in-game to collect plant samples in different parts of a virtual rainforest. They then reconvene as a whole group to discuss findings.</li>
      </ul> </td>
   </tr>
   <tr>
    <td><b>Independent projects or homework</b></td>
    <td>
      <ul>
      <li>Individual students are assigned to an experience.</li>
      <li>Game play can be any length and not restricted to a single session.</li>
      <li><b>Example</b>: A student plays a physics simulation over the span of a week where they join for different lengths of time. </li>
      </ul></td>
   </tr>
</tbody>
</table>

### Common devices

Student and educator devices vary, but in general it's best to test experiences on low-end devices for playability. A typical classroom may have Chromebooks, PC laptops, or iPads.

For testing purposes, we recommend a device with the following minimum specifications:

- **Processor**: Intel® Celeron Processor - Celeron N4000 or better. Intel® i5, or i7 Processor
- **Memory**: 4GB or more
- **Display**: 11-12 inch HD displays

### Safety and well-being

Safety is built into every aspect of Roblox developers must prioritize safety in their experiences. Below are recommendations that may influence a project's design.

- **Be Cautious with Violence** - Some educators will not accept any form of violence. If needed, aim for cartoonish violence and avoid direct confrontations. For instance, instead of using a sword, have magical wands that cast spells.
- **Disable Voice Chat and Limit Text Chat** - Voice chat can be difficult for educators to supervise, or could be a source of distraction. The same follows for text chat.
- **Create a Closed Garden** - Students cannot, under any circumstance, be allowed to interact with the general public while online. Encourage the use of private servers.

## Demonstrate educational value

Educational experiences need some way of measuring a student's ability to meet learning objectives and displaying that progress to educators. Measuring performance can happen automatically through tracked metrics, or through designed assessments.

### Capture data in experience

Developers can use experiences to collect data that offers insight on how users are meeting learning objectives. Below is a high level overview of the types of information that can be captured within an experience.

Please note this is not exhaustive. More detail can be found in the book [Stealth Assessment](https://mitpress.mit.edu/9780262518819/stealth-assessment/) by Valerie Shute and Matthew Ventura.

<table>
<thead>
   <tr>
    <th>Assessment type</th>
    <th>Implementation</th>
   </tr>
</thead>
<tbody>
   <tr>
    <td>Completion</td>
    <td>Whenever a user completes or fails a specific event tied to a learning objective, document that and report it to an educator. This can utilize the Event system in Roblox. </td>
   </tr>
   <tr>
    <td>Time stamps</td>
    <td>Provide time indications when a user completes a specific task or how much time they've been in experience on task.</td>
   </tr>
   <tr>
    <td>Performance</td>
    <td>Any in-game metrics related to a student's performance in-game. This varies by experience but may be in the form of points or medals that signify student progress.</td>
   </tr>
  <tr>
    <td>Trajectory data</td>
    <td>For non-linear learning tasks, these data indicate the order a user takes among a set of specific tasks. For instance, this can be the order of quests completed in a non-linear role playing experience. </td>
   </tr>
   <tr>
    <td>GUI and keystroke interactions</td>
    <td>This includes interactions with the graphical user interface or keystrokes. For instance, how often a user opens the "Help" dialog box, or interacts with an in-game character.</td>
   </tr>
</tbody>
</table>

<Alert severity='warning'>
For any developers capturing data, ensure that your tools comply with Roblox [privacy and data regulations](https://en.help.roblox.com/hc/en-us/articles/115004630823-Roblox-Privacy-and-Cookie-Policy-).
</Alert>

### Assess student progress

Assessments can be constructed to measure a user's progress towards learning objectives. These can be built into the experience, or be external to the experience, such as a physical handout completed by the student.

Note that this list is not exhaustive and more detail along with pros and cons can be found on this external resource on [Exam Questions: Types, Characteristics, and Suggestions](https://uwaterloo.ca/centre-for-teaching-excellence/teaching-resources/teaching-tips/developing-assignments/exams/questions-types-characteristics-suggestions) by University of Waterloo.

<table>
<thead>
<tr>
   <th>Type</th>
   <th>Implementation</th>
</tr>
</thead>
<tbody>
<tr>
   <td><b>Multiple choice</b></td>
   <td>Users complete a quiz or test designed to capture mastery of knowledge learned in the experience. Guidance on writing strong questions can be found in <a href="https://cft.vanderbilt.edu/guides-sub-pages/writing-good-multiple-choice-test-questions/" target="_blank" rel="noopener">Writing Good Multiple Choice Test Questions</a> by Vanderbilt. Note: Multiple choice quizzes are cautioned against for demonstrating understanding of content due to their simplicity. </td>
</tr>
<tr>
   <td><b>Short response</b></td>
   <td>Have students write in response to a prompt. That written work is then graded by an educator. For instance, a user builds a robot in an experience. A prompt then has the student writing about their process in designing the robot to demonstrate their engineering process.</td>
</tr>
<tr>
   <td><b>Fill in the blank </b></td>
   <td>Users are asked about what they learned and are prompted to fill in blanks with key words or concepts.</td>
</tr>
</tbody>
</table>

## Additional resources

Below are some resources providing more insight into the topics which were covered throughout this article.

### Design checklist

While working on the game design document, reference this checklist. This serves as a summary of key points in this article.

<table>
<thead>
<tr>
   <th>Topic</th>
   <th>Self-reflection questions</th>
</tr>
</thead>
<tbody>
<tr>
   <td>Determine learning and gameplay foundation</td>
   <td><ul>
   <li>What topic is this teaching? What are learning standards used for that topic? What are learning objectives for the experience?</li>
   <li>What is interesting, exciting, or fun within the topic and learning objectives?</li>
   <li>How does the gameplay loop contribute to the learning objectives?</li>
   </ul></td>
</tr>
<tr>
   <td>Understand the needs of educators and students using the experience</td>
   <td><ul>
   <li>What are user experience recommendations for the target age? Is the gameplay and learning age-appropriate to the target demographic?</li>
   <li>Is there anything in the experience that would cause issues for teachers, such as challenging gameplay or violence?</li>
   <li>What supplemental resources will be provided to educators so they understand how the experience can be used in a classroom? </li>
   </ul></td>
</tr>
<tr>
   <td>Determine the context where the experience will be played.</td>
   <td><ul>
   <li>What will be the average session time of users, and cadence in which they're expected to play?</li>
   <li>Does the experience include mild violence, drug use, or anything potentially objectionable in schools?</li>
   <li>Are there gameplay features that might be seen as objectionable in schools, such as violence? </li>
   </ul></td>
</tr>
<tr>
   <td>Identify how the experience is measuring learning. </td>
   <td><ul>
   <li>How will educators see that their students learn after playing the experience?</li>
   <li>What forms of assessment and evaluation make sense in the experience?</li>
   </ul></td>
</tr>
</tbody>
</table>

### Further reading

Below are resources for learning more about learning standards, creating lesson plans, and organizing classroom activities. Note that all below resources are external, non-roblox sites, and provided as a courtesy only.

#### Find learning standards

Designers can reference these educational institutions to find standards that align to their experience's target age and topic.

- [Next Generation Science Standards](https://www.nextgenscience.org/) - Respected standards for science education that are commonly adopted within United States classrooms.
- [Common Core](https://learning.ccsso.org/common-core-state-standards-initiative) - English and Math standards, often adjusted on a state-by-state (United States) basis.
- [College Board](https://apstudents.collegeboard.org/course-index-page) - Series of exams with standards for high school to college coursework.

<Alert severity='info'>
Designers can also search using key terms such as "high school gravity learning standards". If you do find a standard, ensure that it's verified by an institution such as Common Core.
</Alert>

#### Design supplemental resources

The following articles are in-depth resources on how to design supplements for educators, such as lesson plans.

- [Writing Learning Objectives](https://cteresources.bc.edu/documentation/learning-objectives/) - Outlines how to write effective learning objectives.
- [Writing Lesson Plans](https://cte.smu.edu.sg/approach-teaching/integrated-design/lesson-planning) - For designers interested in writing supplemental lesson plans for educators.
- [Lesson Plan Template](https://uei.uchicago.edu/learn/LessonPlan_Rubric_CGW.pdf) - An example of how to present lesson plans. Use this as inspiration to design your own, with your organization's branding
- [Using Discussion Questions](https://citl.indiana.edu/teaching-resources/teaching-strategies/discussions/index.html) - Outlines how to use utilize discussion questions in a lesson plan.
- [Designing Discussion Questions](https://teaching.pitt.edu/wp-content/uploads/2020/07/FLEX-Designing-Discussion-Questions-Using-Blooms-Taxonomy-Examples.pdf) - Covers how to write effective discussion questions.
