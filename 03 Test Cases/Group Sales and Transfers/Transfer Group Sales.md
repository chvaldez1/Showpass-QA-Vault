**Critical**

```
Given Customer A sends transferable tickets to existing Customer B
When Customer B opens /checkout/transfers/[transaction_id] while logged in and accepts the transfer
Then the selected tickets move to Customer B, Customer B can view/use them in My Orders, and Customer A can no longer use them
```

```
Given Customer A sends transferable tickets to a recipient email with no Showpass account
When the recipient opens /checkout/transfers/[transaction_id], creates an account, and accepts the transfer
Then the selected tickets are assigned to the new account and visible in My Orders
```

```
Given a group sale distributor sends group sale items to a recipient
When the recipient opens the transfer acceptance flow and accepts the distributed items
Then the items move to the recipient, group sale history shows the accepted transfer, and customer group context is preserved
```

**Major**

```
Given Customer A sends tickets to Customer B while Customer B is logged out
When Customer B opens /checkout/transfers/[transaction_id], logs in, and accepts the transfer
Then the transfer context is preserved and the tickets are assigned to Customer B
```

```
Given Customer A sends only some tickets from an order to Customer B
When Customer B accepts the transfer
Then only the selected tickets move to Customer B and the remaining tickets stay with Customer A
```

```
Given Customer A sends a transfer to Customer B
When Customer B opens the transfer after Customer A cancelled it
Then Customer B cannot accept it and the tickets remain with Customer A
```

```
Given Customer A sends a transfer to Customer B
When Customer B opens a transfer that is already accepted, expired, or invalid
Then the transfer cannot be accepted again and no ticket ownership changes
```

**Medium**

```
Given Customer A sends a transfer to Customer B
When a different logged-in customer opens /checkout/transfers/[transaction_id] and attempts to accept it
Then the transfer is not assigned to the wrong account or the system requires the intended recipient flow
```

```
Given Customer A sends tickets that require delivery or attendee details
When Customer B accepts the transfer
Then any required recipient details are collected and saved before the transfer completes
```

```
Given transferred tickets include wallet/barcode-enabled items
When Customer B accepts the transfer
Then Customer B receives valid ticket access and Customer A’s transferred ticket access is no longer valid
```

**Low**

```
Given Customer A sends a transfer to Customer B
When Customer B accepts the transfer
Then confirmation messaging and transfer email state show the transfer as accepted
```

```
Given a group sale transfer recipient accepts distributed items
When the distributor reviews transfer history
Then accepted status, recipient email, item quantities, and accepted timestamp are shown correctly
```