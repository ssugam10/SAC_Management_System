import Sequelize from 'sequelize';
import sequelize from '../config.js';
import Student from './Student.js';
import Item from './Item.js';

const HistoryLog = sequelize.define('historyLog', {
    // Define attributes for the history log, e.g., itemId, timestamp, etc.
    itemId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    timeOfIssue: {
        type: Sequelize.DATE,
        allowNull: false
    },
    timeOfReturn: {
        type: Sequelize.DATE,
        allowNull: true // Allow null to indicate the book hasn't been returned yet
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false // Enforce that studentId cannot be NULL
    }
    // Add more attributes as needed
});

HistoryLog.belongsTo(Item, { foreignKey: 'itemId', as: 'item' });


export default HistoryLog;
