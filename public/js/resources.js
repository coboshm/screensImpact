/**
 * Created by cobos on 23/01/15.
 */
var resources = angular.module('APIModule', ['ngResource']);


resources.factory("Assets", function($resource) {
    return $resource("/apiWeb/assets/:id");
});