# Create KiteTicker using api key and access token
   
```typescript
import { KiteTicker } from 'kiteconnect-ts';
ticker: KiteTicker = new KiteTicker({
apiKey: 'XXX',
accessToken: 'YYY',
});
```

# Call the kite connect and pass all the instruments in the array and start receiving the ticks

```typescript
this.ticker.on('ticks', (ticks: any[]) => {

    console.log('Ticks', ticks[0].lastPrice);
});

this.ticker.on('connect', () => {
    const items = [18647042];
    this.ticker.subscribe(items);
});

this.ticker.connect();
```

## Receive the last price - ticks[0].lastPrice