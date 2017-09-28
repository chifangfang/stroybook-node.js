import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {CardTest,DatePickerTest,DialogTest,DragGridTest,DropDownTest,FormTest,FunnelTest,InputBasisTest,LineChartsTest,SelectFieldTest,SnackBarTest,TextFieldNewTest,TextareaTest,ToggleTest} from './nodeFile/jsxFile';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import todoApp from './redux/allReducers';
import middleware from './middleware/middleware';
const middlewareList = [thunkMiddleware, middleware];
const finalCreateStore = compose(
 applyMiddleware(...middlewareList),
 )(createStore);
const store = finalCreateStore(todoApp);

storiesOf('material-ui', module)
.add('Card', () => (<Provider store={store}><CardTest/></Provider>))
.add('DatePicker', () => (<Provider store={store}><DatePickerTest/></Provider>))
.add('Dialog', () => (<Provider store={store}><DialogTest/></Provider>))
.add('DragGrid', () => (<Provider store={store}><DragGridTest/></Provider>))
.add('DropDown', () => (<Provider store={store}><DropDownTest/></Provider>))
.add('Form', () => (<Provider store={store}><FormTest/></Provider>))
.add('Funnel', () => (<Provider store={store}><FunnelTest/></Provider>))
.add('InputBasis', () => (<Provider store={store}><InputBasisTest/></Provider>))
.add('LineCharts', () => (<Provider store={store}><LineChartsTest/></Provider>))
.add('SelectField', () => (<Provider store={store}><SelectFieldTest/></Provider>))
.add('SnackBar', () => (<Provider store={store}><SnackBarTest/></Provider>))
.add('TextFieldNew', () => (<Provider store={store}><TextFieldNewTest/></Provider>))
.add('Textarea', () => (<Provider store={store}><TextareaTest/></Provider>))
.add('Toggle', () => (<Provider store={store}><ToggleTest/></Provider>))

