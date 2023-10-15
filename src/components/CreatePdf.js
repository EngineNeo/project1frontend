import React, { useEffect, useState } from 'react';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { Button } from '@material-ui/core';  // Import Button here

function CreatePdf() {
    const [allCustomers, setAllCustomers] = useState([]);

    const fetchAllCustomers = async () => {
        let fetchedCustomers = [];
        let page = 1;
        let totalPages = 1;  // Placeholder, will be updated from the first response

        const fetchPage = async (page) => {
            const response = await fetch(`http://127.0.0.1:8000/customers/?page=${page}`);
            const data = await response.json();
            return data;
        };

        // Fetch the first page to get the total number of pages
        const firstPageData = await fetchPage(page);
        totalPages = Math.ceil(firstPageData.count / 10);  // Assuming 10 items per page
        fetchedCustomers = fetchedCustomers.concat(firstPageData.results);
        page++;

        // Define the maximum number of requests to issue in parallel
        const maxParallelRequests = 5;

        while (page <= totalPages) {
            // Determine the range of pages to fetch in this batch
            const batchStartPage = page;
            const batchEndPage = Math.min(page + maxParallelRequests - 1, totalPages);

            // Issue the requests for this batch in parallel
            const batchPromises = [];
            for (let i = batchStartPage; i <= batchEndPage; i++) {
                batchPromises.push(fetchPage(i));
            }
            const batchResults = await Promise.all(batchPromises);

            // Concatenate the results of this batch
            for (const result of batchResults) {
                fetchedCustomers = fetchedCustomers.concat(result.results);
            }

            // Update the page number for the next batch
            page += maxParallelRequests;
        }

        setAllCustomers(fetchedCustomers);
    };

    const generatePdf = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['ID', 'First Name', 'Last Name', 'Email', 'Active', 'Create Date', 'Last Update']],
            body: allCustomers.map(customer => [
                customer.customer_id,
                customer.first_name,
                customer.last_name,
                customer.email,
                customer.active ? 'Yes' : 'No',
                customer.create_date,
                customer.last_update
            ])
        });
        doc.save('customers.pdf');
    };

    useEffect(() => {
        fetchAllCustomers();
    }, []);

    return (
        <Button variant="contained" color="primary" onClick={generatePdf} style={{ marginLeft: '20px' }}>  {/* Adjust color and styling here */}
            Create PDF
        </Button>
    );
}

export default CreatePdf;
