/**
 * Simple Longest Common Subsequence (LCS) based word diffing utility.
 * Splits text into tokens (words, spaces, symbols) and determines differences.
 */
export function diffWords(oldStr, newStr) {
  if (!oldStr) return [{ type: 'added', value: newStr || '' }];
  if (!newStr) return [{ type: 'removed', value: oldStr || '' }];

  // Split keeping spaces, words, and newlines as individual tokens
  const tokenize = (str) => {
    return str.split(/(\r?\n|\s+|[.,!?;:()""'']|\b)/).filter(Boolean);
  };

  const oldWords = tokenize(oldStr);
  const newWords = tokenize(newStr);

  const n = oldWords.length;
  const m = newWords.length;

  // Initialize DP table
  const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (oldWords[i - 1] === newWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to assemble diffs
  let i = n;
  let j = m;
  const result = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldWords[i - 1] === newWords[j - 1]) {
      result.unshift({ type: 'equal', value: oldWords[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'added', value: newWords[j - 1] });
      j--;
    } else {
      result.unshift({ type: 'removed', value: oldWords[i - 1] });
      i--;
    }
  }

  return result;
}

/**
 * Calculates estimated token count based on standard English word approximation (1 token ≈ 4 characters or ~0.75 words)
 */
export function estimateTokens(text) {
  if (!text) return 0;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount * 1.35));
}
