## Valex

<p>API referente à concessão de benefícios por parte do empregador</p>
<p>Funcionalidades quanto ao cartão: criação, ativação, bloqueio, desbloqueio, recarga e compra</p>


## Usage

```bash
$ git clone https://github.com/anaraquelmatos/projeto18-valex

$ cd projeto18-valex

$ npm install

$ npm run dev
```

API:

```
- POST /card-user
    - Rota para criar um cartão
    - headers: { "Authorization": "Bearer $ajdhsu.le-api-key" }
    - body: {
        "employeeId": 2,
        "type": "education"
}
- POST /card-user-activate
    - Rota para ativar um cartão
    - headers: {}
    - body: {
        "id": 10,
        "securityCode": "767",
        "password": "1238"
}
- GET /card-balance-transactions/:id
    - Rota para listar os saldos e transações
    - headers: {}
    - body: {}
- POST /block-card
    - Rota para bloquear um cartão
    - headers: {}
    - body: {
        "id": 10,
        "password": "1238"
}
- POST /unblock-card
    - Rota para desbloquear um cartão
    - headers: {}
    - body: {
        "id": 10,
        "password": "1238"
}
- POST /recharge-card
    - Rota para recarregar um cartão
    - headers: { "Authorization": "Bearer $ajdhsu.le-api-key" }
    - body: {
        "id": 10,
        "amount": 1400
}
- POST /purchase-card
    - Rota para fazer compra em um cartão
    - headers: { "Authorization": "Bearer $ajdhsu.le-api-key" }
    - body: {
        "cardId": 10,
        "password": "1238",
        "businessId": 1,
        "amount": 700
}


```
