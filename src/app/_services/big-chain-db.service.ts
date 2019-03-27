import { Injectable } from '@angular/core';
import * as driver from 'bigchaindb-driver';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
const apiUrl = 'https://test.bigchaindb.com/api/v1/';

const conn = new driver.Connection(apiUrl);





@Injectable({
  providedIn: 'root'
})
export class BigChainDBService {

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(public http: HttpClient) { }

  // gets a Ed25519Keypair from a pass phrase
  getKeypair() {
    return new driver.Ed25519Keypair();
  }

  getTransaction(id) {
    const url = apiUrl + 'transactions/' + id;
    console.log(id);
    return this.http.get(url).pipe(
      tap(_ => console.log(`fetched id=${id}`)),
      catchError(this.handleError(`getTransaction id=${id}`))
    );
  }

  searchTransaction(query) {
    const url = apiUrl + 'assets?search=' + query;
    console.log(query);
    return this.http.get(url).pipe(
      tap(_ => console.log(`fetched query=${query}`)),
      catchError(this.handleError(`getTransaction query=${query}`))
    );

  }



  createPurchase(data, key) {

    const assetdata = {
      'email': data.email,
      'action': data.action,
      'type': data.type,
      'date': data.date,
      'points': data.points,

    };

    const metadata = {
      'planet': 'earth'
    };

    const baseTransaction = driver.Transaction.makeCreateTransaction(
      assetdata,
      metadata,

      // A transaction needs an output
      [driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(key.publicKey))],

      key.publicKey
    );

    const signedTransaction = driver.Transaction.signTransaction(baseTransaction, key.privateKey);


    // const url = apiUrl + 'transactions?mode=async' , JSON.stringify(signedTransaction);
    console.log(signedTransaction);
    return this.http.post(`${apiUrl}transactions?mode=async`, JSON.stringify(signedTransaction), httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap(() => console.log(`added transaction=${signedTransaction}`)),
      catchError(this.handleError('createTransaction'))
    );

  }

  createTransaction() {

    // tslint:disable-next-line:no-shadowed-variable
    const admin = {
      'publicKey': '2qp4QFkyuRRFo8bseGFby1fEew81ztpigLWFdGswq2cK',
      'privateKey': '8wbua1RpsFiwyzdHYRsHVRPVqA5AWs9cambZJt5Zuhqc'
    };

    const assetdata = {
      'loyaltySystem': {
        'id': 'testid3',
        'type': 'TrolleeLegend',
        'action': [{
          'action_name': 'Like',
          'action_point': 1,
          'max_cap': 5
        },
        {
          'action_name': 'Checkout Success',
          'action_point': 20,
          'max_cap': 0

        },
        {
          'action_name': 'Sign up',
          'action_point': 10,
          'max_cap': 1
        },
        {
          'action_name': 'Sign in',
          'action_point': 2,
          'max_cap': 5
        },
        {
          'action_name': 'Add to Cart',
          'action_point': 1,
          'max_cap': 5
        },

        {
          'action_name': 'Share',
          'action_point': 2,
          'max_cap': 5
        },
        {
          'action_name': 'Referral',
          'action_point': 2,
          'max_cap': 5
        },
        {
          'action_name': 'Add to Checkout',
          'action_point': 1,
          'max_cap': 5
        },
        {
          'action_name': 'Spent',
          'action_point': 1,
          'max_cap': 5
        }

        ],

        'transaction_point': [
          {
            'transaction_amount': 100,
            'trasaction_percentage': 0.05
          },
          {
            'transaction_amount': 200,
            'trasaction_percentage': 0.10
          },
          {
            'transaction_amount': 400,
            'trasaction_percentage': 0.15
          },
          {
            'transaction_amount': 600,
            'trasaction_percentage': 0.20
          },
          {
            'transaction_amount': 800,
            'trasaction_percentage': 0.25
          },
          {
            'transaction_amount': 1000,
            'trasaction_percentage': 0.30
          }


        ],

        'tiers': [{
          'id': 1,
          'name': 'Bronze',
          'min_point': 1,
          'max_point': 99,
        },
        {
          'id': 2,
          'name': 'Silver 1',
          'min_point': 100,
          'max_point': 199,
        },
        {
          'id': 3,
          'name': 'Silver 2',
          'min_point': 200,
          'max_point': 399,

        },
        {
          'id': 4,
          'name': 'Silver 3',
          'min_point': 400,
          'max_point': 599,
        },
        {
          'id': 4,
          'name': 'Silver 4',
          'min_point': 600,
          'max_point': 799,
        },
        {
          'id': 5,
          'name': 'Gold 1',
          'min_point': 800,
          'max_point': 999,
        },
        {
          'id': 6,
          'name': 'Gold 2',
          'min_point': 1000,
          'max_point': 1199,
        },
        {
          'id': 7,
          'name': 'Gold 3',
          'min_point': 1200,
          'max_point': 1399,
        },
        {
          'id': 7,
          'name': 'Gold 4',
          'min_point': 1400,
          'max_point': 1599,
        },
        {
          'id': 8,
          'name': 'Platinium',
          'min_point': 1600,
        },

        ]

      }
    };

    const metadata = {
      'planet': 'earth'
    };

    const baseTransaction = driver.Transaction.makeCreateTransaction(
      assetdata,
      metadata,

      // A transaction needs an output
      [driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(admin.publicKey))],
      admin.publicKey
    );

    const signedTransaction = driver.Transaction.signTransaction(baseTransaction, admin.privateKey);

    conn.postTransactionCommit(signedTransaction);

    // const url = apiUrl + 'transactions?mode=async' , JSON.stringify(signedTransaction);
    console.log(signedTransaction);
    return this.http.post(`${apiUrl}transactions?mode=async`, JSON.stringify(signedTransaction), httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap(() => console.log(`added transaction=${signedTransaction}`)),
      catchError(this.handleError('createTransaction'))
    );


  }









  // searches assets in BDB based on a text input
  async searchTypeInstances(text: string, link: string) {
    await conn;
    const txList = [];
    const assetList = await conn.searchAssets(text);
    for (const asset of assetList) {
      if (asset.data.link === link) {
        const tx = await conn.getTransaction(asset.id);
        txList.push(tx);
      }
    }

    return txList;
  }

  // searches assets in BDB based on a text input
  async searchChildAssets(text: string, link: string, parent: string) {
    await conn;
    const txList = [];
    const assetList = await conn.searchAssets(text);
    for (const asset of assetList) {
      if (asset.data.link === link && asset.data.parent === parent) {
        const tx = await conn.getTransaction(asset.id);
        txList.push(tx);
      }
    }

    return txList;
  }

  // gets all transfer transactions for an asset
  async getTransferTransactionsForAsset(assetId: string) {
    await conn;
    return conn.listTransactions(assetId, 'TRANSFER');
  }

  // gets all outputs (spent or unspent) from a wallet
  async getAssetsInWallet(publicKey: string, spent: boolean) {
    await conn;
    const assets = [];
    const unSpent = await conn.listOutputs(publicKey, spent);

    if (!unSpent || !unSpent.length) {
      return [];
    }

    for (const item of unSpent) {
      const tx = await conn.getTransaction(item.transaction_id);
      if (tx.operation === 'CREATE') {
        assets.push({
          'id': tx.id,
          'asset': tx.asset,
          'metadata': tx.metadata
        });
      } else {
        const crTx = await conn.getTransaction(tx.asset.id);
        assets.push({
          'id': crTx.id,
          'asset': crTx.asset,
          'metadata': crTx.metadata
        });
      }
    }

    console.log(assets);
    return assets;
  }

  // // returns the blockchain history of an asset
  // // under the hood, gets a list of metadata objects of all transfers of the asset
  // async getAssetHistory(assetId: string) {
  //   await conn;

  //   const createTx = await this.getTransaction(assetId);
  //   const transferTx = await this.getTransferTransactionsForAsset(assetId);

  //   const assetData = createTx.asset.data;
  //   const metadataArr = [];
  //   metadataArr.push(createTx.metadata);
  //   for (const trtx of transferTx) {
  //     metadataArr.push(trtx.metadata);
  //   }

  //   metadataArr.sort((a, b) => b.timestamp - a.timestamp);
  //   return metadataArr;
  // }

  // Creates a new asset in BigchainDB
  // tslint:disable-next-line:no-shadowed-variable



  // // tslint:disable-next-line:no-shadowed-variable
  // async createNewAsset(keypair, asset, metadata) {
  //   await conn;
  //   const condition = driver.Transaction.makeEd25519Condition(keypair.publicKey, true);

  //   const output = driver.Transaction.makeOutput(condition);
  //   output.public_keys = [keypair.publicKey];

  //   const transaction = driver.Transaction.makeCreateTransaction(
  //     asset,
  //     metadata,
  //     [output],
  //     keypair.publicKey
  //   );

  //   const txSigned = driver.Transaction.signTransaction(transaction, keypair.privateKey);
  //   let tx;
  //   await conn.postTransactionCommit(txSigned)
  //     .then(retrievedTx => {
  //       tx = retrievedTx;
  //       console.log('Asset Created: ' + retrievedTx.id);
  //     });

  //   return tx;
  // }

  // Transfers a BigchainDB asset from an input transaction to a new public key
  // tslint:disable-next-line:no-shadowed-variable
  async transferAsset(tx: any, fromKeyPair, toPublicKey: string, metadata) {
    await conn;

    const condition = driver.Transaction.makeEd25519Condition(toPublicKey);

    const output = driver.Transaction.makeOutput(condition);
    output.public_keys = [toPublicKey];

    const txTransfer = driver.Transaction.makeTransferTransaction(
      [{ tx, output_index: 0 }],
      [output],
      metadata
    );

    const txSigned = driver.Transaction.signTransaction(txTransfer, fromKeyPair.privateKey);
    let trTx;
    await conn.postTransactionCommit(txSigned)
      .then(retrievedTx => {
        trTx = retrievedTx;
        console.log('Asset Transferred: ' + retrievedTx.id);
      });

    return trTx;
  }




}





// conn.getTransaction('23cd274940a544f42cb0edfb71a803fb912ae38345125ab91b37942f2253a04a').then(data => {
//   console.log('-----Transaction-----');
//   console.log(data);
// });


