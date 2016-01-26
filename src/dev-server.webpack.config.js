import {partial, inject} from 'webpack-partial';
import {runtime} from 'webpack-udev-server';

export default ({hot = process.env.HOT}) => (config) => {
  const {entry, target} = config;
  const env = process.env.NODE_ENV || 'development';

  // Don't use for anything but development.
  if (env !== 'development') {
    return config;
  }

  // Rewrite all the entry points to include HMR code.
  return partial(config, {
    entry: inject(entry, runtime({target, hot})),
  });
};
