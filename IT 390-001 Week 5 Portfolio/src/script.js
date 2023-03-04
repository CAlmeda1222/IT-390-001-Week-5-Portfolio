// Code goes here
angular.module('MasterDetailDemo', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/blog/list');
  var states = [
    {
      abstract: true,
      name: 'wrapper',
      url: '/blog',
      template: "<h1>NVIDIA GeForce RTX 20 Series</h1><ui-view></ui-view>",
      controller: 'wrapperController'
    },{
      name: 'wrapper.master',
      url: '/list',
      template: "<ol><li ng-repeat='post in data'><h2><a ui-sref='wrapper.detail({id: {{post.id}}})'>{{post.title}}</a></h2></li></ol>"
    },{
      name: 'wrapper.detail',
      url: '/{:id}',
      template: "<a ui-sref='wrapper.master'><- Back to list</a><br><h2>{{post.title}}</h2><p>{{post.body}}</p>",
      controller: 'detailController'
    }
  ];
  states.forEach((state) => $stateProvider.state(state));

}]).controller('wrapperController', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.data;
  //Mimic asyncronous GET request
  $timeout(() => {
    $scope.data = [
      {
        id: 0,
        title: 'NVIDIA GeForce RTX 2060 (12 GB)',
        body: 'This model was released on December 7th, 2021. As the title states, It possesses a memory of 12 GBs and it also has a Bandwidth of 366 Gb/s. The price of this Graphics Card is $480.'
      },{
        id: 1,
        title: 'NVIDIA GeForce RTX 2070',
        body: 'This model was released on October 17th, 2018. It possesses a memory of 8GBs and a Bandwidth of 448 GB/s. The price for this Graphics Card is $499.'
      },{
        id: 2,
        title: 'NVIDIA GeForce RTX 2080 Super',
        body: 'This model was released on July, 23rd, 2019. It possesses a memory of 8GBs and a Bandwidth of 496 GB/s. The price for this Graphics card is $699.'
      }
    ];
  }, 3000);
  
}]).controller('detailController', ["$scope", "$stateParams", function($scope, $stateParams) {
  var post_id = $stateParams.id;

  if ($scope.data) {
    $scope.post = $scope.data[post_id];
  }
}]);
