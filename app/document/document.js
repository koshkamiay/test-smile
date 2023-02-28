'use strict';

angular.module('testSmile.document', ['ngRoute', 'dx'])
    .controller('documentCtrl', initDocumentCtrl);


function initDocumentCtrl($routeParams, $scope, $http) {
    $scope.errorMsg = null;
    $scope.documentInfo = null;
    $scope.documentGoods = null;

    $http({
        method: 'GET',
        url: 'http://api-test.tdera.ru/api/getdocument?id='+$routeParams.documentId,
        headers: {
            "Authorization": "Basic bDEyMzQ1Njc4OnAxMjM0NTY3OA=="
        },
        credentials: "include"})
    .then(function success(response) {
        if(response.status == 200) {
            if(response.data.exception > 0) {
                $scope.errorMsg = response.data.exception.error_msg || 'Произошла ошибка при загрузке данных';
            } else {
                $scope.documentInfo = response.data.data.data1[0];
                $scope.documentGoods = response.data.data.data2;
                initDocumentTable();
            }
        } else {
            $scope.errorMsg = response.statusText || 'Произошла ошибка при загрузке данных';
        }
    }, function (error) {
        $scope.errorMsg = error.statusText || 'Произошла ошибка при загрузке данных';
    });

    function initDocumentTable() {
        $scope.menuInstance1 = {};
        $scope.menuInstance2 = {};

        $scope.documentGoodsOptions1 = {
            dataSource: $scope.documentGoods,
            keyExpr: 'id_good_nakl',
            columns: [
                {
                    dataField: 'id_pos',
                    caption: '№',
                    sortOrder: 'asc',
                    width: 70,
                },
                {
                    dataField: 'id_good_nakl',
                    width: 120,
                },
                {
                    dataField: 'pos_name',
                    caption: 'Наименование'
                },
                {
                    dataField: 'id_inst',
                    dataType: 'number',
                    visible: false
                }
            ],
            showBorders: true,
            rowDragging: {
                data: 1,
                group: 'documentGoods',
                showDragIcons: false,
                onAdd,
            },
            filterValue: ['id_inst', '=', '1'],
            onInitialized: function (e) {
                $scope.menuInstance1 = e.component;
            },
            noDataText: 'Нет данных',
            searchPanel: {
                visible: true,
                placeholder: 'Поиск по наименованию',
                width: 250
            },
            loadPanel: {
                enabled: true
            }
        };

        $scope.documentGoodsOptions2 = {
            dataSource: $scope.documentGoods,
            keyExpr: 'id_good_nakl',
            columns: [
                {
                    dataField: 'id_pos',
                    caption: '№',
                    sortOrder: 'asc',
                    width: 70,
                },
                {
                    dataField: 'id_good_nakl',
                    width: 120,
                },
                {
                    dataField: 'pos_name',
                    caption: 'Наименование'
                },
                {
                    dataField: 'id_inst',
                    dataType: 'number',
                    visible: false,
                }
            ],
            showBorders: true,
            rowDragging: {
                data: 2,
                group: 'documentGoods',
                showDragIcons: false,
                onAdd,
            },
            filterValue: ['id_inst', '=', '2'],
            onInitialized: function (e) {
                $scope.menuInstance2 = e.component;
            },
            noDataText: 'Нет данных',
            searchPanel: {
                visible: true,
                placeholder: 'Поиск по наименованию',
                width: 250
            },
            loadPanel: {
                enabled: true
            }
        };
    }

    function onAdd(e) {
        $scope.documentGoods.map(function(item) {
            if(item.id_good_nakl == e.itemData.id_good_nakl) {
                item.id_inst = e.toData;
                $scope.menuInstance1.refresh();
                $scope.menuInstance2.refresh();
            }
        });
    }
}