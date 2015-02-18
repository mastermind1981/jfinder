//'use strict';
//
//describe('Controllers', function () {
//
//	describe('Main Controller', function () {
//
//		var $controller, createController, scope, dataSource;
//
//		beforeEach(function () {
//			module('app.main');
//
//			module(function ($provide) {
//				$provide.value('dataSource', {
//					get: function (resource) {
//						return {
//							then: function (callback) {
//								return callback(['AngularJS', 'Gulp', 'Jasmine', 'BrowserSync']);
//							}
//						}
//					}
//				});
//
//				return null;
//			});
//		});
//
//		beforeEach(function () {
//			inject(function ($controller, $rootScope, _dataSource_) {
//				scope = $rootScope.$new();
//				dataSource = _dataSource_;
//
//				createController = function () {
//					return $controller('Main', {
//						$scope: scope
//					});
//				};
//			});
//		});
//
//		it('should create cotroller', function () {
//			expect(createController()).toBeDefined();
//		});
//
//		it('should invoke one time get method of dataSource service', function () {
//			spyOn(dataSource, 'get').and.callThrough();
//
//			createController();
//			expect(dataSource.get).toHaveBeenCalled();
//		});
//
//		it('should provide set of tools pulled from dataSource service', function () {
//			var main = createController();
//
//			expect(angular.isArray(main.tools)).toBe(true);
//			expect(main.tools.length).toBe(4);
//			expect(main.tools).toContain('AngularJS');
//		});
//
//	});
//
//});
