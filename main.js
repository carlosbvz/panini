
const gridController = (() => {

    const $grid = $('#panini-grid');

    const nonGottenStickerClassName = 'badge-secondary';
    const gottenStickerClassName = 'badge-success'

    let gridData;

    const getGridData = () => {
        return $.ajax({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/carlosbvz/panini/master/data.json',
            });
    };
    const getGridSchema = (item) => {
        return `<span class="badge ${nonGottenStickerClassName} badge-panini" data-index-id="${item.id}">${item.id}</span>`;
    };
    const addDataToGrid = (gridData) => {
        for (let group in gridData) {
            gridData[group].forEach(item => {
                $grid.append(getGridSchema(item));
            });
        }
    };
    const bindGridEvents = () => {
        $grid.find('.badge-panini').on('click', (e) => {
            $(e.currentTarget).removeClass(nonGottenStickerClassName).addClass(gottenStickerClassName);
        });
    };
    const initGrid = () => {
        getGridData()
            .done((data) => {
                console.log(data);
                gridData = JSON.parse(data)[0]; // Cache data
                addDataToGrid(gridData);
                bindGridEvents();
            });
    };

    const init = () => {
        initGrid();
    }
    return {
        init
    }
})();

gridController.init();