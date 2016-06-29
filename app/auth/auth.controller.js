(function() {
  'use strict';

  angular
    .module('mutantApp.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$state', 'authService'];

  function AuthController($state, authService) {
    var vm = this;
    vm.firstCome = true;
    vm.register = register;
    vm.login = login;
    vm.changeFirstCome = changeFirstCome;
    vm.error = null;

    function register(user) {
      return authService.register(user)
        .then(function() {
          vm.login(user);
        })
        .then(function() {
          return authService.sendWelcomeEmail(user.email);
        })
        .catch(function(error) {
          vm.error = error;
        });
    }

    function login(user) {
      return authService.login(user)
        .then(function(user) {
          $state.go('mutantList');
        })
        .catch(function(error) {
          vm.error = error;
        });
    }

    function changeFirstCome(bool) {
      vm.firstCome = bool;
    }

  }
})();
