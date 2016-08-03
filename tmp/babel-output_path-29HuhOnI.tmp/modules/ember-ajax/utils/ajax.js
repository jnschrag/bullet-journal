/* global najax */
import Ember from 'ember';
import isFastBoot from './is-fastboot';

var $ = Ember.$;

export default isFastBoot ? najax : $.ajax;