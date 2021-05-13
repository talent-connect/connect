
// What inspired this thing?
// Find all you need to know here:
// https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
//
// However, in a nutshell:
// It's a interesting TS technique, basically "forced exhaustiveness checking",
// where the code literally won't compile if you haven't checked all values of
// a union type. The great effect is that the code will automatically break if
// you add another type to the union.

export function assertUnreachable(x: never): never {
    throw new Error("Didn't expect to get here");
}