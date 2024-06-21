const pivot = new WebDataRocks({
    container: "#table",
    toolbar: true,
    report: {
        dataSource: {
            data: JSON.parse(localStorage.getItem("order"))
        },
        slice: {
            rows: [
                {
                    uniqueName: "Піца"
                }
            ],
            columns: [
                {
                    uniqueName: "Measures"
                }
            ],
            measures: [
                {
                    uniqueName: "К-ть",
                    aggregation: "sum"
                },
                {
                    uniqueName: "Ціна",
                    aggregation: "sum"
                }
            ]
        },
        options: {
            grid: {
                showTotals: "off"
            }
        }
    }   
});
localStorage.removeItem("order");