export function read(): { [key: string]: string } {
  try {
    const secretsJson: {
      [key: string]: string;
    } = require('../../secrets.json');
    return secretsJson;
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      console.debug('~/secrets.json not found');
      return {};
    }

    throw e;
  }
}
