// Create a blurb
const createBlurb = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://api.10centuries.org/content',
    body: {
      content : bundle.inputData.content
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'blurb',
  noun: 'Blurb',

  display: {
    label: 'Create Blurb',
    description: 'Creates a social post, also called a blurb.'
  },

  operation: {
    inputFields: [
      {
        key: 'content',
        required: true,
        type: 'string',
        helpText: 'The content of the blurb.'
      }
    ],
    perform: createBlurb
  }
};
