import { useEffect, useState } from 'react';
import { StorageConstants } from '@jumbo/constants/Storage';
import { errorCode } from '@jumbo/constants/ErrorCode';
import { CONFIGURATION } from 'Configuration';
import { NotificationManager } from 'react-notifications';
import { message } from 'antd';
// import 'react-notifications/lib/notification.css';

export const capitalizeFLetter = string => {
  return string[0].toUpperCase() + string.slice(1);
};

export const isValidEmail = value => {
  return value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(value);
};

export const idGenerator = () => {
  return Math.floor(Math.random() * 100000);
};

export const linkify = inputText => {
  let replacedText, replacePattern1, replacePattern2, replacePattern3;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/gim;
  replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z0-9\\-]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  return replacedText;
};

export const geValidUrl = (url, ubSecureUrl = false) => {
  if (!url.match(/^[a-zA-Z]+:\/\//)) {
    if (ubSecureUrl) {
      return 'http://' + url;
    }
    return 'https://' + url;
  }

  return url;
};

export const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value, delay],
  );

  return debouncedValue;
};

export const getToken = () => {
  return localStorage.getItem(StorageConstants.token);
};
export const getErrorText = error => error?.response?.data?.message;

export const handleError = (error, options) => {
  if (typeof error === 'string') {
    message.error(error); // show message
    NotificationManager.error(error, 'Error', 5000, () => {
      alert('callback');
    });
    return;
  }
  const errorDetail = error.response?.data || {};
  if (process.env.NODE_ENV === CONFIGURATION.environment.development) {
    console.error(error);
  }
  // if (errorDetail.errorCode !== errorCodeConstant.errorNoData) {
  //   Sentry.captureMessage(errorDetail.message, { level: Sentry.Severity.Error }); // push message error to sentry
  // }
  if (
    (!options?.isIgnoredMessage && errorDetail.errorCode !== errorCode.errorNoData) ||
    (options?.showNotFoundMessage && errorDetail.errorCode === errorCode.errorNoData)
  ) {
    // message.error(getErrorText(error)); //show message
    if (!getErrorText(error)) {
      message.error('Something went wrong!');
    } else {
      message.error(getErrorText(error)); //show message
    }

    NotificationManager.error(getErrorText(error), 'Error', 5000, () => {
      alert('callback');
    });
  }
  if (options?.callback) {
    options.callback();
  }
};
