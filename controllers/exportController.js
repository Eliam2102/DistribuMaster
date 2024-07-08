//Imporataciones necsarias para poder exportar los resultados
//librerias en uso blob-stream y pdfkit
const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');
const ExcelJS = require('exceljs');
const { writeToPath } = require('@fast-csv/format');

async function exportarAPDF(req, res) {
    try {
        const { tipocalculo, resultado } = req.body;

        const doc = new PDFDocument();
        const stream = doc.pipe(blobStream());

        doc.fontSize(25).text('Resultado del Cálculo', { align: 'center' });

        doc.fontSize(18).text(`Tipo de Cálculo: ${tipocalculo}`, {
            align: 'left'
        });

        doc.fontSize(18).text(`Resultado: ${resultado}`, {
            align: 'left'
        });

        doc.end();

        stream.on('finish', function() {
            const blob = stream.toBlob('application/pdf');
            const url = stream.toBlobURL('application/pdf');
            res.json({ url });
        });

    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function exportarAExcel(req, res) {
    try {
        const { tipocalculo, resultado } = req.body;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Resultados');

        worksheet.columns = [
            { header: 'Tipo de Cálculo', key: 'tipocalculo', width: 30 },
            { header: 'Resultado', key: 'resultado', width: 30 }
        ];

        worksheet.addRow({ tipocalculo, resultado });

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Disposition', 'attachment; filename=resultados.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

    } catch (error) {
        console.error('Error al generar el Excel:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function exportarACSV(req, res) {
    try {
        const { tipocalculo, resultado } = req.body;

        const filePath = '/tmp/resultados.csv';
        const data = [
            ['Tipo de Cálculo', 'Resultado'],
            [tipocalculo, resultado]
        ];

        writeToPath(filePath, data)
            .on('finish', () => {
                res.download(filePath, 'resultados.csv', (err) => {
                    if (err) {
                        console.error('Error al descargar el CSV:', err);
                        res.status(500).json({ mensaje: 'Error en el servidor' });
                    }
                });
            });

    } catch (error) {
        console.error('Error al generar el CSV:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

module.exports = {
    exportarAPDF,
    exportarAExcel,
    exportarACSV
};
