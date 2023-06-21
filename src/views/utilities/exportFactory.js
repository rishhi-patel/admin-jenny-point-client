import ExcelJS from 'exceljs';
import moment from 'moment';

const formateData = (data) => {
    const fields = [
        'user',
        'distributor',
        'deliveryPerson',
        'wareHouseManager',
        'currentOrderStatus',
        'shippingAddress',
        'totalPrice',
        'totalQty',
        'createdAt'
    ];

    // Loop through each object in the data array
    const processedData = data.map((obj) => {
        // Create a new object to store processed values
        const processedObj = {};
        // Check each field and assign default value if not present
        fields.forEach((field) => {
            switch (field) {
                case 'user':
                case 'distributor':
                case 'deliveryPerson':
                case 'wareHouseManager':
                    {
                        processedObj[field] = obj.hasOwnProperty(field) ? obj[field]?.name : '';
                    }
                    break;
                case 'currentOrderStatus':
                    {
                        processedObj[field] = obj.hasOwnProperty(field) ? obj[field]?.status : '';
                    }
                    break;
                case 'totalPrice':
                    {
                        processedObj[field] = obj.hasOwnProperty(field) ? '₹' + obj[field] : '';
                    }
                    break;
                case 'totalPrice':
                    {
                        processedObj[field] = obj.hasOwnProperty(field) ? '₹' + obj[field] : '';
                    }
                    break;
                case 'createdAt':
                    {
                        processedObj[field] = obj.hasOwnProperty(field) ? moment(obj[field]).format('Do MMMM YYYY') : '';
                    }
                    break;
                default:
                    {
                        processedObj[field] = obj.hasOwnProperty(field) ? obj[field] : '';
                    }
                    break;
            }
        });

        return processedObj;
    });

    return processedData;
};

const exportToCsv = (response = []) => {
    // Export data to CSV format
    const data = formateData(response);
    const csvContent =
        'data:text/csv;charset=utf-8,' + Object.keys(data[0]).join(',') + '\n' + data.map((obj) => Object.values(obj).join(',')).join('\n');
    const csvFile = encodeURI(csvContent);
    const csvLink = document.createElement('a');
    csvLink.setAttribute('href', csvFile);
    csvLink.setAttribute('download', 'output.csv');
    document.body.appendChild(csvLink);
    csvLink.click();
};
const exportToExcel = (response = []) => {
    // Export data to Excel format
    const data = formateData(response);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    worksheet.addRow(Object.keys(data[0]));
    data.forEach((obj) => {
        const row = worksheet.addRow(Object.values(obj));
        row.commit();
    });
    workbook.xlsx
        .writeBuffer()
        .then((buffer) => {
            const excelFile = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const excelLink = document.createElement('a');
            excelLink.href = window.URL.createObjectURL(excelFile);
            excelLink.setAttribute('download', 'output.xlsx');
            document.body.appendChild(excelLink);
            excelLink.click();
        })
        .catch((err) => {
            console.error('Error writing Excel file:', err);
        });
};

export default { exportToExcel, exportToCsv };
