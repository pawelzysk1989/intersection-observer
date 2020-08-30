import { Observable, Subscriber } from 'rxjs';

export type IntersectionCallback<T> = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
  subscriber: Subscriber<T>
) => void;

export const fromIntersectionObserver = <T>(
  target: Element,
  callback: IntersectionCallback<T>,
  options?: IntersectionObserverInit
) =>
  new Observable((subscriber) => {
    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          callback(entry, observer, subscriber);
        });
      },
      options
    );
    intersectionObserver.observe(target);

    return {
      unsubscribe(): void {
        intersectionObserver.disconnect();
      },
    };
  });
