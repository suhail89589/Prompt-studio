/**
 * Intelligent Mock Prompt Enhancer.
 * Analyzes the user's prompt and expands it with professional guidelines, context,
 * formatting instructions, constraints, and role definitions, returning score and stats.
 */
export function enhancePromptLocal(prompt) {
  const trimmed = prompt.trim();
  if (!trimmed) {
    return {
      enhancedText: '',
      beforeScore: 0,
      afterScore: 0,
      beforeTokens: 0,
      afterTokens: 0,
      badges: [],
      qualityBefore: 'Poor',
      qualityAfter: 'Poor',
      details: {}
    };
  }

  // Determine prompt category
  const lower = trimmed.toLowerCase();
  let category = 'general';
  if (lower.includes('linkedin') || lower.includes('post') || lower.includes('social') || lower.includes('twitter')) {
    category = 'social_media';
  } else if (lower.includes('resume') || lower.includes('cv') || lower.includes('job') || lower.includes('cover letter')) {
    category = 'career';
  } else if (lower.includes('python') || lower.includes('code') || lower.includes('javascript') || lower.includes('react') || lower.includes('interview') || lower.includes('bug')) {
    category = 'technical';
  } else if (lower.includes('email') || lower.includes('write') || lower.includes('marketing') || lower.includes('sales')) {
    category = 'writing';
  }

  // Predefined prompt template enhancements
  let enhancedText = '';
  let badges = ['✅ Clearer Instructions', '✅ Better Context'];

  switch (category) {
    case 'social_media':
      enhancedText = `[Role & Context]
You are an expert Social Media Copywriter, Content Strategist, and Audience Growth Specialist with deep experience in driving high engagement on platforms like LinkedIn and Twitter.

[Task Instruction]
Your objective is to craft or optimize the following content into a high-converting, highly engaging post:
"${trimmed}"

[Structuring Guidelines]
1. **Hook**: Start with an attention-grabbing, single-sentence hook (less than 120 characters) that creates curiosity or addresses a major pain point.
2. **Body**: Organize the body using short, single-sentence paragraphs or bullet points to ensure readability. Ensure there is plenty of whitespace.
3. **Value Drop**: Include 2-3 actionable insights, data points, or clear takeaways.
4. **Call to Action (CTA)**: End with an open-ended, thought-provoking question to drive comments, or a clear instruction (e.g., "Save this for later").
5. **Tone**: Maintain an authentic, authoritative yet conversational, and professional tone. Avoid corporate jargon or excessive self-promotion.
6. **Hashtags**: Include 3 relevant, trending hashtags at the very bottom.

[Constraints]
- Keep the total length under 1,500 characters.
- Do not use emojis excessively (maximum of 3 to 4, placed naturally).
- Avoid passive voice; write in active, direct verbs.`;
      badges.push('✅ Added Constraints', '✅ Better Formatting', '✅ Improved Role Definition');
      break;

    case 'career':
      enhancedText = `[Role & Context]
You are a Senior Technical Recruiter, Career Coach, and professional resume writer specializing in optimizing career materials for Fortune 500 applicant tracking systems (ATS).

[Task Instruction]
Optimize and refine the following career material (resume bullet, cover letter draft, or profile bio):
"${trimmed}"

[Structuring Guidelines]
1. **Result-Oriented Framing**: Restructure each bullet point using the Google X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]".
2. **Action Verbs**: Begin every sentence with a strong, active verb (e.g., *Spearheaded*, *Architected*, *Accelerated*, *Optimized*).
3. **Metrics & Impact**: Quantify impact wherever possible. If metrics are missing, placeholder areas like "[insert % or $ impact]" should be clearly marked.
4. **ATS Friendly**: Embed high-demand industry skills, tools, and methodologies naturally to pass ATS algorithms.

[Constraints]
- Eliminate filler words (e.g., "responsible for", "assisted with", "worked on").
- Keep paragraphs concise, focusing strictly on high-impact contributions.`;
      badges.push('✅ Added Constraints', '✅ More Specific', '✅ Improved Role Definition');
      break;

    case 'technical':
      enhancedText = `[Role & Context]
You are an elite Staff Software Engineer, Systems Architect, and technical interviewer. You have deep expertise in clean code practices, security principles, algorithmic efficiency, and developer productivity.

[Task Instruction]
Please perform the requested development task, review code, or write a technical solution for:
"${trimmed}"

[Structuring Guidelines]
1. **Implementation**: Provide code blocks with comprehensive type safety, comments, and modern practices.
2. **Explanation**: Briefly explain the architectural choices, complexity bounds (Big O), and corner cases handled.
3. **Tests**: Include a set of unit tests or test cases verifying edge cases (e.g. null inputs, empty lists, boundary values).
4. **Alternatives**: Note any trade-offs or alternative designs (e.g. memory vs. time efficiency).

[Constraints]
- Write clean, modular, dry code.
- Always include error handling and input validation.
- Format all code snippets cleanly using standard conventions.`;
      badges.push('✅ Clearer Instructions', '✅ Added Constraints', '✅ Better Formatting', '✅ More Specific');
      break;

    case 'writing':
      enhancedText = `[Role & Context]
You are an expert copywriter, communications designer, and messaging strategist. You specialize in persuasive writing, email deliverability, and high-impact messaging.

[Task Instruction]
Draft, polish, or rewrite the following message:
"${trimmed}"

[Structuring Guidelines]
1. **Subject Line / Header**: Provide 3 distinct, compelling subject lines categorized by style (Curiosity-based, Direct/Benefit, and Short/Casual).
2. **Opening Hook**: Grab attention within the first 2 sentences.
3. **Core Message**: Focus on the value to the recipient ("What's in it for them").
4. **Call to Action**: End with a single, clear, low-friction next step (e.g., "Do you have 5 minutes for a call on Tuesday?").

[Constraints]
- Tone: Professional, warm, and highly personalized.
- Word Count: Keep the main body under 200 words.
- Sentence Structure: Vary sentence lengths to create a natural, dynamic reading rhythm.`;
      badges.push('✅ Better Context', '✅ Better Formatting', '✅ More Specific');
      break;

    default:
      enhancedText = `[Role & Persona]
Act as an elite expert in this domain. Approach this task with precision, depth, and structural clarity.

[Core Objective]
Fulfill the following request:
"${trimmed}"

[Detailed Instructions]
1. **Structured Breakdown**: Organize your response with clear headings, bullet points, and distinct sections.
2. **Context & Rationale**: Provide the necessary context or underlying logic for each point made.
3. **Actionable Deliverables**: Focus on practical, real-world examples and step-by-step guidance.
4. **Quality & Depth**: Avoid generic advice; offer specific, concrete details.

[Constraints]
- Maintain a clear, concise, and professional tone.
- If any details are ambiguous, outline the assumptions you are making before presenting the solution.
- Double-check all facts and code blocks for correctness and modern syntax.`;
      badges.push('✅ Better Formatting', '✅ Clearer Instructions');
      break;
  }

  // Calculate stats
  const beforeChar = trimmed.length;
  const afterChar = enhancedText.length;
  const beforeWords = trimmed.split(/\s+/).filter(Boolean).length;
  const afterWords = enhancedText.split(/\s+/).filter(Boolean).length;
  const beforeTokens = Math.max(1, Math.round(beforeWords * 1.35));
  const afterTokens = Math.max(1, Math.round(afterWords * 1.35));

  // Scores
  const beforeScore = Math.floor(Math.random() * 20) + 40; // 40-59
  const afterScore = Math.floor(Math.random() * 10) + 88; // 88-97

  const getQuality = (score) => {
    if (score < 50) return 'Poor';
    if (score < 75) return 'Fair';
    if (score < 88) return 'Good';
    return 'Excellent';
  };

  return {
    enhancedText,
    beforeScore,
    afterScore,
    beforeTokens,
    afterTokens,
    badges,
    qualityBefore: getQuality(beforeScore),
    qualityAfter: getQuality(afterScore),
    details: {
      beforeChar,
      afterChar,
      beforeWords,
      afterWords
    }
  };
}
