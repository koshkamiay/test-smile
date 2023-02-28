'use strict';

angular.module('testSmile.table', ['ngRoute', 'dx'])
    .controller('tableCtrl', initTableCtrl);

function initTableCtrl($scope, $http, $location) {
    $scope.tableData = null;
    $scope.dataGridOptions = null;
    $scope.errorMsg = null;

    $http({
        method: 'GET',
        url: 'http://api-test.tdera.ru/api/getdocumentlist',
        headers: {
            "Authorization": "Basic bDEyMzQ1Njc4OnAxMjM0NTY3OA=="
        },
        credentials: "include"})
        .then(function success(response) {
            if(response.status == 200) {
                if(response.data.exception > 0) {
                    $scope.errorMsg = response.data.exception.error_msg || 'Произошла ошибка при загрузке данных';
                } else {
                    $scope.tableData = response.data;
                    initTable();
                }
            } else {
                $scope.errorMsg = response.message || 'Произошла ошибка при загрузке данных';
            }
        });

    function initTable() {
        $scope.dataGridOptions = {
            dataSource: $scope.tableData.data,
            keyExpr: 'id_record',
            columns: [
                {
                    dataField: 'id_pos',
                    caption: '№',
                    sortOrder: 'asc',
                    width: 50,
                },
                {
                    dataField: 'id_record',
                    caption: 'id записи'
                },
                {
                    dataField: 'id_hd_route',
                    caption: 'id маршрута'
                },
                {
                    dataField: 'nom_route',
                    caption: 'Номер маршрута'
                },
                {
                    dataField: 'nom_zak',
                    caption: 'Номер заказа'
                },
                {
                    dataField: 'nom_nakl',
                    caption: 'Номер накладной'
                }
            ],
            showBorders: true,
            onRowDblClick(event) {
                $location.path("/document/"+event.key);
            },
            loadPanel: {
                enabled: true
            },
            searchPanel: {
                visible: true,
                placeholder: 'Поиск...',
                width: 250
            },
        };
    }
}