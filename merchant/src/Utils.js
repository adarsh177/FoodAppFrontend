export function GetTimeInWords(time) {
  if (time > 24 * 60 * 60 * 1000) {
    const days = Math.floor(time / (24 * 60 * 60 * 1000));
    const hrs = Math.floor(
      (time - days * 24 * 60 * 60 * 1000) / (60 * 60 * 1000),
    );
    return `${days} days ${hrs} hours`;
  } else if (time > 60 * 60 * 1000) {
    const hrs = Math.floor(time / (60 * 60 * 1000));
    const mins = Math.floor((time - hrs * 60 * 60 * 1000) / (60 * 1000));
    return `${hrs} hours ${mins} mins`;
  } else {
    const mins = Math.floor(time / (60 * 1000));
    return `${mins} mins`;
  }
}
