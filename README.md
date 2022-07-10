# projeto18-valex

## rotas card: 
   - **post :** https://rys-valex.herokuapp.com/card/create
      - **header :** x-api-key
      - **body :** { employeeId , type }
   - **post :** https://rys-valex.herokuapp.com/card/activate
      - **body :** { cardId , password , CVC }
   - **get :** https://rys-valex.herokuapp.com/card/balance
      - **body :** { cardId , CVC }
   - **post :** https://rys-valex.herokuapp.com/card/lock
      - **body :** { cardId , password }
   - **post :** https://rys-valex.herokuapp.com/card/unlock
      - **body :** { cardId , password }
   
## rotas recharge:
  - **post :** https://rys-valex.herokuapp.com/recharge
    - **header :** x-api-key
    - **body :** { cardId , amount }
  
## rotas purchase:
  - **post :** https://rys-valex.herokuapp.com/purchase
    - **body :** { cardId , password , businessId , amount }
