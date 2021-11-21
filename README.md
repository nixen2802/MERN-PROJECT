# Billing System

In this era of technology it is very much tedious to manage bills of a small organisation physically. So there must be a technological connect of this problem. So we have proposed a solution for managing bills of a small organisation by developing a website. Through our website organisation can reduce the complexity of managing bills. 

# Dependencies:
1. NodeJS                              11. MongoDB                    21. html-pdf
2. ExpressJS                           12. Mongoose                   22. is-empty
3. ReactJS                             13. number-to-words            23. nodemailer
4. Fontawesome                         14. pdfmake                    24. nodemailer-sendgrid-support
5. Axios                               15. print-js                   25. nodemon
6. Bootstrap                           16. react-datepicker           26. popup
7. File-saver                          17. react-router-dom           27. validator
8. html-to-pdfmake                     18. body-parser
9. html2canvas                         19. cors
10. jspdf                              20. dotenv

# How to install all dependencies? 
npm install {name of dependency}

# Steps to start website locally:
1. Clone the entire repository.
2. Open entire folder in any code editor of your choice.
3. Navigate to backend folder.
4. Add .env file and add 2 environment variables name user and pass which will store email and pass of organisation.
5. Start mongodb server.
6. Open 2 terminals.
7. In first terminal navigate to backend and type npm start and enter. (This will start backend of the system which is hosted on port 5000).
8. In second terminal navigate to billing-system and type npm start and enter. (This will start frontend of the system which is hosted on port 3000).
9. If browser window doesnt opens up automatically manually start any of the browsers and type localhost:3000 in search bar and hit enter home page of website must be visible.
10. If website not visible then again follow above steps.


# Features
1. Login / Register using email id.
2. Add / update / delete customers.
3. Add / update /delete products.
4. Add / update / delete bills.
5. Print bill.
6. Mail bill to the particular customer.
