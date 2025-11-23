
import { create } from 'zustand';

// Mock implementation of the store's addXp logic for testing
export const calculateLevelUp = (
  initialXp: number,
  initialLevel: number,
  amount: number
): { xp: number; level: number } => {
  let currentXp = initialXp + amount;
  let currentLevel = initialLevel;
  let nextLevelXp = currentLevel * 1000;

  while (currentXp >= nextLevelXp) {
    currentXp -= nextLevelXp;
    currentLevel++;
    nextLevelXp = currentLevel * 1000;
  }

  return { xp: currentXp, level: currentLevel };
};

// Basic test runner
const runTests = () => {
  console.log('Running XP Logic Tests...');

  const testCases = [
    {
      name: 'Single Level Up',
      initial: { xp: 900, level: 1 },
      amount: 200,
      expected: { xp: 100, level: 2 }, // Needs 1000. 900+200=1100. 1100-1000=100. L2.
    },
    {
      name: 'Multiple Level Ups',
      initial: { xp: 0, level: 1 },
      amount: 5000,
      expected: { xp: 2000, level: 3 }, // L1(1000) + L2(2000) = 3000. 5000-3000=2000. L3.
    },
    {
      name: 'No Level Up',
      initial: { xp: 0, level: 1 },
      amount: 500,
      expected: { xp: 500, level: 1 },
    },
    {
      name: 'Exact Level Up',
      initial: { xp: 0, level: 1 },
      amount: 1000,
      expected: { xp: 0, level: 2 },
    },
  ];

  let failures = 0;

  testCases.forEach((test) => {
    const result = calculateLevelUp(test.initial.xp, test.initial.level, test.amount);
    if (result.xp !== test.expected.xp || result.level !== test.expected.level) {
      console.error(
        `[FAIL] ${test.name}: Expected {xp: ${test.expected.xp}, level: ${test.expected.level}}, got {xp: ${result.xp}, level: ${result.level}}`
      );
      failures++;
    } else {
      console.log(`[PASS] ${test.name}`);
    }
  });

  if (failures > 0) {
    console.error(`${failures} tests failed.`);
    process.exit(1);
  } else {
    console.log('All tests passed.');
  }
};

runTests();
