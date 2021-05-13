
// What inspired this thing?
// Find all you need to know here:
// https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript

export function assertUnreachable(x: never): never {
    throw new Error("Didn't expect to get here");
}