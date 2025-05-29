import { defineField } from 'sanity';

const TITLE = 'Signup Form';

export default {
  name: 'signupForm',
  title: TITLE,
  type: 'object',
  fields: [
    defineField({ 
      type: 'richTextSimple',
      name: 'textContent',
      title: 'Text Content'
    }),
    defineField({ 
      type: 'string',
      name: 'emailFieldPlaceholder',
      title: 'Email Field Placeholder Text'
    }),
    defineField({ 
      type: 'string',
      name: 'submitButtonText',
      title: 'Submit Button Text'
    }),
    defineField({
      type: 'string',
      name: 'successMessage',
      title: 'Success Message'
    }),
    defineField({
      type: 'string',
      name: 'errorMessage',
      title: 'Error Message'
    }),
    defineField({
      type: 'string',
      name: 'consentStatement',
      title: 'Consent Statement'
    }),
    defineField({ 
      type: 'string',
      name: 'formId',
      title: 'MailChimp Form ID'
    }),
  ],
  preview: {
    select: {
      
    },
    prepare(selection) {
      return {
        title: TITLE,
        icon: () => '📧',
      }
    },
  },
}
