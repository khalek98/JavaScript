import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';


import './app.css'; 

function App() {

    const data = [
        {name: 'Khalek I.', salary: 800, key: 1},
        {name: 'Alex M.', salary: 5000, key: 2},
        {name: 'Jhon S.', salary: 1100, key: 3},
        {name: 'Dmitry P.', salary: 2000, key: 4},
        {name: 'Mary P.', salary: 5000, key: 5}
    ];

    return (
        <div className="app">
            <AppInfo/>

            <div className="search-panel">
                <SearchPanel/>
                <AppFilter/>
            </div>

            <div className="employees">
                <EmployeesList data={data}/>
                <EmployeesAddForm/>
            </div>
        </div>
    );
};

export default App;