# Configurable form component

## Depedencies

This component depends on `@material-ui`. To install it, follow the [instructions](https://material-ui.com/getting-started/installation/ "How to install Material UI").

## Usage

Follow next guide to start using this form component.

First of all you need to import `BaseForm` component and include it in template.

```
import BaseForm from '{PATH_TO_COMPONENT_FOLDER}/BaseForm';

...

<BaseForm options={...} />
```

To customize this component you need to provide options [described below](#options) into `options` attribute as object.

### Options<a id="options"></a>

| Key            | Type                                    | Required | Default value | Description |
|----------------|-----------------------------------------|----------|---------------|-------------|
| fields         | `FormField[]`                           | yes      | -             | Array of fields configurations. Check type description in the [next section](#formField) |
| onSubmit       | `(changes: {[k: string]: any}) => void` | yes      | -             | Form submit callback, provides changes in properties as object |
| onCancel       | `() => void`                            | no       | `() => {}`    | Form cancel callback, nothing special |
| isValidOnLoad  | `boolean`                               | no       | `false`       | Property which defines, should be your form be valid by default or not. |
| cancelLabel    | `JSX.Element` or `string`               | no       | `Cancel`      | Cancel button label. Here you can provide a `string` or `JSX.Element` like `<FormattedMessage ... />` from `react-intl` |
| submitLabel    | `JSX.Element` or `string`               | no       | `Ok`          | Submit button label. Here you can provide a `string` or `JSX.Element` like `<FormattedMessage ... />` from `react-intl` |

### FormField <a id="formField"></a>

| Key          | Type                      | Required | Default value | Description |
|--------------|---------------------------|----------|---------------|-------------|
| label        | `JSX.Element` or `string` | yes      | -             | Field label which would be displayed above the input. Here you can provide a `string` or `JSX.Element` like `<FormattedMessage ... />` from `react-intl` |
| name         | `string`                  | yes      | -             | Field name, it will be used in form changes in `onSubmit` callback as a key |
| type         | enum FormFieldType        | yes      | -             | One of [available types](#fieldTypes) |
| initialValue | any                       | no       | -             | Field value that should be in the form on load |
| errorMessage | `JSX.Element` or `string` | no       | -             | Error message that will be displayed under the input |
| onChange     | `(value: any) => void`    | no       | -             | Callback which called on each input change. It will provide an actual field value |
| required     | `boolean`                 | no       | -             | Input `required` flag which requires a value in input |
| fullWidth    | `boolean`                 | no       | -             | Markup option, to make field fullwidth. By default they are 50% width of the form width with spacing between |
| minDate      | `Moment`                  | no       | -             | WORKS ONLY WITH `FormFieldType.DATE`! Minimal available date. |
| maxDate      | `Moment`                  | no       | -             | WORKS ONLY WITH `FormFieldType.DATE`! Maximal available date.  |

### FormFieldType<a id="fieldTypes"></a>

- `FormFieldType.TEXT` - default text input
- `FormFieldType.EMAIL` - text input with `email` type and validation
- `FormFieldType.TEL` - text input with `tel` type and validation
- `FormFieldType.DATE` - date picker field