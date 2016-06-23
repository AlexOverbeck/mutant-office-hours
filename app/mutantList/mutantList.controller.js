(function() {
  'use strict';

  angular
    .module('mutantApp.mutantList')
    .controller('MutantListController', MutantListController);

  MutantListController.$inject = ['$firebaseArray', 'mutantService', 'firebaseDataService'];

  function MutantListController($firebaseArray, mutantService, firebaseDataService) {
    var vm = this;
    var mutantsRef = firebaseDataService.root.child('mutants');
    var textsRef = firebase.database().ref().child('texts');

    vm.addMutant = addMutant;
    vm.newMutant = new mutantService.Mutant();
    vm.mutants = $firebaseArray(mutantsRef);
    vm.toggleComplete = toggleComplete;
    vm.deleteMutant = deleteMutant;
    vm.sendText = sendText;

    function addMutant() {
      vm.mutants.$add(vm.newMutant);
      vm.newMutant = new mutantService.Mutant();
    }

    function toggleComplete(mutant) {
      vm.mutants.$save(mutant);
    }

    function deleteMutant(mutant) {
      vm.mutants.$remove(mutant);
    }

    function sendText(mutant) {
      var newText = {
        topic: mutant.topic,
        name: mutant.name,
        phoneNumber: mutant.phone
      };
      textsRef.push(newText);
      mutant.notified = true;
      vm.mutants.$save(mutant);
    }
  }

})();
