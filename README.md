# @ouroboros/define-mui

[![npm version](https://img.shields.io/npm/v/@ouroboros/define-mui.svg)](https://www.npmjs.com/package/@ouroboros/define-mui) ![MIT License](https://img.shields.io/npm/l/@ouroboros/define-mui.svg)

Define-MUI generates forms and result tables using [@ouroboros/define](https://www.npmjs.com/package/@ouroboros/define) files to describe the data, and [Material-UI](https://mui.com/material-ui/) components to generate the HTML.

## Install
```bash
npm install @ouroboros/define-mui
```

## Using

It is strongly recommended that before using this library you fully understand how Define definitions work. Full explanation for data structures built using Define can be found at [ouroboroscoding.com/define](https://ouroboroscoding.com/define).

## \_\_ui\_\_

Define-MUI extends definition files by adding the special field \_\_ui\_\_ to both parents and nodes.

### Tree / Parent UI

| Node | Type | Description |
| ---- | ---- | ----------- |
| [\_\_create\_\_](#ui-create) | string[] | The list, and order, of nodes to display in a `create` Form. |
| [\_\_order\_\_](#ui-order) | string[] | The list, and order, of nodes to display as a default for all class types. |
| [\_\_primary\_\_](#ui-primary) | string | The name of the node that represents the primary key in the record. |
| [\_\_result\_\_](#ui-result) | string[] | The list, and order, of nodes to display in each Result row. |
| [\_\_update\_\_](#ui-update) | string[] | The list, and order, of nodes to display in an `update` Form. |

#### ui create

Allows a custom list of nodes, and the order of those nodes, in a `create` Form instead of showing every node in the same order as in the definition.

```json
{
	"__name__": "user",
	"__ui__": {
		"__create__": [
			"email",
			"passwd",
			"first_name",
			"last_name"
		]
	}
}
```

#### ui order

Allows a custom list of nodes, and the order of those nodes,
Allows a custom list of nodes, and the order of those nodes, to display in a `create` Form if \_\_create\_\_ is not set, in an `update` Form if \_\_update\_\_ is not set, and in a Result row if \_\_result\_\_ is not set.

```json
{
	"__name__": "user",
	"__ui__": {
		"__order__": [
			"email",
			"first_name",
			"last_name"
		]
	}
}
```

#### ui primary

Allows setting the name of the node that acts as the primary key of the record, by default `_id` is used.

```json
{
	"__name__": "user",
	"__ui__": {
		"__primary__": "id"
	}
}
```

#### ui result

Allows a custom list of nodes, and the order of those nodes, in a Result row instead of showing every node in the same order as in the definition.

```json
{
	"__name__": "user",
	"__ui__": {
		"__primary__": "id",
		"__result__": [
			"id",
			"created",
			"email"
		]
	}
}
```

#### ui update

Allows a custom list of nodes, and the order of those nodes, in a `update` Form instead of showing every node in the same order as in the definition.

```json
{
	"__name__": "user",
	"__ui__": {
		"__update__": [
			"email",
			"first_name",
			"last_name"
		]
	}
}
```

### Node UI

| Node | Type | Description |
| ---- | ---- | ----------- |
| [\_\_adornment\_\_](#ui-adornment) | string | Character or string to put before field data, only used in `price` node |
| [\_\_default\_\_](#ui-default) | any | The default value to set for the node in the case of a `create` form |
| [\_\_errors\_\_](#ui-errors) | object | Error message codes or short strings mapped to more descriptive error messages we want to display |
| [\_\_extra_space\_\_](#ui-extra_space) | bool | Set to add an extra space after commas in `multiselectcsv` node |
| [\_\_maximum\_\_](#ui-maximum) | number | Limits the number of characters for `text` and `textarea` types |
| [\_\_options\_\_](#ui-options) | Subscribe \| [string, string][] \| string[] | Options to use in generating options for `select` and checkboxes for `multiselectcsv` |
| [\_\_regex\_\_](#ui-regex) | RegExp \| string | Regular expression to validate `text` types |
| [\_\_title\_\_](#ui-title) | string | The title / placeholder to display with inputs |
| [\_\_type\_\_](#ui-type) | string | The type of input to use to override the default based on the Node's default type |

#### ui adornment

Useful for `price` types if we want to change the default $ to another monetary symbol, for example €.

```json
{
	"cost": {
		"__type__": "price",
		"__ui__": {
			"__adornment__": "€"
		}
	}
}
```

#### ui default

The default used instead of null when creating nodes on `create` Forms.

```json
{
	"subscribe": {
		"__type__": "bool",
		"__ui__": {
			"__default__": true
		}
	}
}
```

#### ui errors

An object containing simple error messages received from the system mapped to more complex descriptions.

```json
{
	"passwd": {
		"__type__": "string",
		"__ui__": {
			"__type__": "password",
			"__errors__": {
				"invalid": "Password requires 8 characters with one uppercase and one lower case letter as well as one number.",
				"missing": "Password is a required"
			}
		}
	}
}
```

#### ui extra_space

In the case of `multiselectcsv` types, the data is stored by default with no spaces, i.e. "one,two,three". Set the extra space field to `true` in order to make it return data like "one, two, three".

```json
{
	"country": {
		"__type__": "string",
		"__ui__": {
			"__type__": "multiselectcsv",
			"__options__": [ "Canada", "Mexico", "United States" ],
			"__extra_space__": true
		}
	}
}
```

#### ui maximum

Useful if we need to limit the maximum characters a text node can accept.

```json
{
	"name": {
		"__type__": "string",
		"__ui__": {
			"__maximum__": 32
		}
	}
}
```

#### ui options

Allows setting static options for a node if none are present in the primary data, or if we want to create more descriptive options, or if the data is dynamic and requires being pulled or pushed from another source. The last only being available at runtime via Subscribe models and not via JSON definition files.

```json
{
	"name": {
		"__type__": "string",
		"__ui__": {
			"__type__": "select",
			"__options__": [
				[ "CA", "Canada" ],
				[ "MX", "Mexico" ],
				[ "US", "United States" ]
			]
		}
	}
}
```

#### ui regex

Use a regular expression to validate whether data is correct, overriding any validation done on the value itself. Useful for data which may be stored in a DB as one type, hash data, but be entered in another type, plain text. A good example of this is a password.

```json
{
	"passwd": {
		"__type__": "md5",
		"__ui__": {
			"__type__": "password",
			"__regex__": "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
		}
	}
}
```

#### ui title

The title of the node, used to display a label above, or a placeholder within, depending on the variant prop sent to the Node.

```json
{
	"first_name": {
		"__type__": "string",
		"__ui__": {
			"__title__": "Given Name"
		}
	}
}
```

#### ui type

The type of input to use to gather the information. Define-MUI comes with several built in types, most of which are decided based on the primary type of the node. However, as new types can be added using the `pluginAdd(name: string, component: DefineBase)` available on all define classes, you can also override this to map it to whatever type is appropriate.

Here are the built in types:

| Type | Description |
| ---- | ----------- |
| bool | Displays a checkbox with `true` being checked, and `false` being unchecked. |
| date | Displays an input element with type 'date'. |
| datetime | Displays two input elements side by side, one a 'date', the other a 'time' type. Stores the data as a single string, e.g. '1981-05-02 12:23:00'. |
| hidden | Generates an input element with 'hidden' type for non-visible data. |
| multiselectcsv | Displayed a field which when clicked opens a popup allowing selection of all available options, which is then stored in a csv format with all checked options. |
| number | Displays an input element of type 'number'. |
| password | Displays an input element of type 'password'. |
| phone_number | Diplays a PhoneInput from the library react-phone-input-material-ui. |
| price | Displays an input element of type 'text' with a special adornment before any text. |
| select | Displays a select element using \_\_options\_\_ values to generate the option elements. |
| text | Displays an input element of type 'text' |
| textarea | Displays a textarea element |
| time | Displays an input element of type 'time' |
| timestamp | Displays two input elements side by side, one a 'date', the other a 'time' type. Stores the value as a number, e.g. 357668580. |

## Form

### Simple Example
`example_1.json`
```json
{
	"__name__": "Example",

	"id": {
		"__type__": "uuid",
		"__optional__": true
	},

	"created": {
		"__type__": "timestamp",
		"__optional__": true
	},

	"string": {
		"__type__": "string",
		"__maximum__": 32
	},

	"int": {
		"__type__": "int",
		"__miniumum__": 10,
		"__maximum__": 20
	},

	"date": {
		"__type__": "date",
		"__minumum__": "2024-01-01",
		"__optional__": true
	},

	"select": {
		"__type__": "string",
		"__options__": [ "one", "two", "three" ]
	},

	"bool": {
		"__type__": "bool"
	}
}
```

Here we have a simple example of a definition file using some standard types.

First thing we will need to enter in data to create new records of this data type will be a create form.

`example_1.js`
```JSX
// Imports
import { timestamp } from '@ouroboros/dates';
import { Tree } from '@ouroboros/define';
import { Form } from '@ouroboros/define-mui';
import React, { useState } from 'react';
import { v4 } from 'uuid';

// Definition
import ExampleDef from 'example_one.json';

// Create the tree instance and merge it with UI specific info,
//	in this case, the list of fields from the definition we
//	want to see in the Form
const ExampleTree = new Tree(ExampleDef, {
	__ui__: {
		__create__: [ 'string', 'int', 'date', 'select', 'bool' ]
	}
});

// Component
export default function ExampleOne(props) {
	return (
		<Form
			onSubmit={(value) => console.log(value)}
			tree={ExampleTree}
			type="create"
		/>
	);
}
```

This would generate a simple form like below

![example_1-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/example1-0.png)

If we entered in some data:

![example_1-1](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/example1-1.png)

And hit the "CREATE" button to trigger our `onSubmit` callback, which in this case just calls console.log with the record from the form:

![example_1-2](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/example1-2.png)

### Form props

| Name    | Type   | Default | Description |
| ------- | ------ | ------- | ----------- |
| display | object | null | Used to set the fields that can be displayed without having to alter the [\_\_ui\_\_](#node-ui) special field in the definition. |
| dynamicOptions | { node, trigger, options }[] | null | A list of nodes `node` that will receive new options `options` based on the change of another node `trigger`. |
| fields | string[] | All nodes in the same order as the Tree was created | The list, and order, of fields to be displayed in the Form. |
| gridSizes | { [node]: { xs, sm, md, lg, xl } } | { \_\_default\_\_: { xs: 12 } } | Allows custom mapping of the grid sizes per node. \_\_default\_\_ value is assigned to all nodes that aren't specified directly. By default all nodes will be on their own line across all 12 grid boxes. |
| gridSpacing | number | 2 | Defines the spacing between grid items. |
| label | 'above' \| 'none' \| 'placeholder' | 'placeholder' | Where to display the title, above the input, within the input, or not at all. |
| onCancel | function | null | Called when the cancel button on the form is pressed. |
| onNodeChange | Node names mapped to callback function | null | Useful for triggering code based on a nodes value changing. Callback receives the full record of all data, the name of the node that triggered, and the value that node was before it was changed. |
| onSubmit | function | required | The function called when the submit button on the form is pressed, assuming the data in the form is valid. Receives the value of the record, as well as the primary key if one exists. |
| title | string \| boolean | false | The title to put above the form. |
| tree | Tree | required | The instance of the Tree which will be used to generate the form as well as validate the data in it. |
| type | 'create' \| 'update' | required | The type of Form, `create` types return all record data on submit, `update` types on return the fields that have changed on submit. |
| value | object | {} | The record data, useful for initially setting values in `create` types, and for setting existing data in `update` types. |
| variant | 'filled' \| 'outlined' \| 'standard' | 'outlined' | The Material-UI input display type. |

```JSX
// Imports
import { timestamp } from '@ouroboros/dates';
import { Tree } from '@ouroboros/define';
import { Form } from '@ouroboros/define-mui';
import React, { useState } from 'react';
import { v4 } from 'uuid';

// Definition
import ExampleDef from 'example_one.json';

// Create the tree instance and merge it with UI specific info,
//	in this case, the list of fields from the definition we
//	want to see in the Form
const ExampleTree = new Tree(ExampleDef, {
	__ui__: {
		__create__: [ 'string', 'int', 'date', 'select', 'bool' ]
	}
});

// Component
export default function ExampleOne(props) {

	// State
	const [ records, recordsSet ] = useState([]);

	// Submit
	function submit(value) {

		// Add ID and created date
		value.id = v4();
		value.created = timestamp();

		// Add the data to the records
		recordsSet(existing => {
			const l = [ ...existing ];
			l.push(value);
			return l;
		});
	}

	// Render
	return (
		<Form
			onSubmit={(value) => console.log(value)}
			tree={ExampleTree}
			type="create"
		/>
	);
}
```