import { useEffect, useState } from 'react';
import './App.css';

const modules = [
  { key: 'masters', title: 'Masters', endpoint: '/api/masters/departments', description: 'Hospital master data such as departments and doctors.' },
  { key: 'opd', title: 'OPD', endpoint: '/api/opd/appointments', description: 'Outpatient appointment and token queue management.' },
  { key: 'ipd', title: 'IPD', endpoint: '/api/ipd/admissions', description: 'Inpatient admissions, bed allocations, and ward occupancy.' },
  { key: 'billing', title: 'Billing', endpoint: '/api/billing/invoices', description: 'Invoices, payments, and settlement tracking.' },
  { key: 'nursing-station', title: 'Nursing Station', endpoint: '/api/nursing-station/tasks', description: 'Nursing task board for medication and vitals schedule.' },
  { key: 'lab', title: 'Lab', endpoint: '/api/lab/orders', description: 'Lab order status and report turnaround dashboard.' },
  { key: 'pharmacy', title: 'Pharmacy', endpoint: '/api/pharmacy/dispense', description: 'Prescription dispensing and medicine fulfillment.' },
  { key: 'radiology', title: 'Radiology', endpoint: '/api/radiology/studies', description: 'Radiology booking and reporting workflow.' }
];

function App() {
  const [serviceData, setServiceData] = useState({});

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

    Promise.all(
      modules.map(async (module) => {
        try {
          const response = await fetch(`${baseUrl}${module.endpoint}`);
          const data = await response.json();
          return [module.key, data.items || []];
        } catch (error) {
          return [module.key, []];
        }
      })
    ).then((results) => {
      setServiceData(Object.fromEntries(results));
    });
  }, []);

  return (
    <div className="app-shell">
      <header>
        <h1>HIMS - Healthcare Information Management System</h1>
        <p>React frontend with Node.js microservices for clinical and operational workflows.</p>
      </header>

      <main className="module-grid">
        {modules.map((module) => (
          <section key={module.key} className="module-card">
            <h2>{module.title}</h2>
            <p>{module.description}</p>
            <h3>Live API Records</h3>
            {serviceData[module.key]?.length ? (
              <pre>{JSON.stringify(serviceData[module.key], null, 2)}</pre>
            ) : (
              <p className="muted">No records loaded. Start backend services to view live data.</p>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
