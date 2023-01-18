type VoidHandlerWithNoArgs = () => void;

export const throttleScroll = (fn: VoidHandlerWithNoArgs, delay: number) => {
  let time = Date.now();

  return () => {
    if (time + delay - Date.now() <= 0) {
      fn();
      time = Date.now();
    }
  };
};
