import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { AppState } from '../../../../app.module';
import { getIdUser } from '../../store/login/login.selectors';
import { ContactModel, ContactSearch, ContactTypeSearch } from './../model/contactModel';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient,
    private store: Store<AppState>) {

  }
  ContactById(id: number): Observable<ContactModel> {
    const param = new HttpParams({
      fromObject: {
        IdContact: (id ? id.toString().trim() : ''),
        TySearch: ContactTypeSearch.NORMALE.toString(),
      }
    });

    return this.http.get<ContactModel>(environment.apiUrl + 'contact/ContactById', { params: param }).pipe(
      map(c => c[0] || null)
    );
  }

  ContactCollection(cs: ContactSearch) {
    const param = new HttpParams({
      fromObject: {
        pTyContact: (cs.pTyContact ? cs.pTyContact.toString() : ''),
        pSurname: (cs.pSurname ? cs.pSurname.trim() : ''),
        pName: (cs.pName ? cs.pName.trim() : ''),
        pBusinessName: (cs.pBusinessName ? cs.pBusinessName.trim() : ''),
        pCdFiscale: (cs.pCdFiscale ? cs.pCdFiscale.trim() : ''),
        pPartitaIva: (cs.pPartitaIva ? cs.pPartitaIva.trim() : ''),
        pLabel: (cs.pLabel ? cs.pLabel.trim() : ''),
        pId: (cs.pId ? cs.pId?.toString().trim() : ''),
        pTySearch: (cs.pTySearch ? cs.pTySearch.toString().trim() : ''),
        OffSet: cs.OffSet.toString(),
        NextRow: (cs.NextRow - cs.OffSet).toString(),
      }
    });

    return this.http.get<ContactModel[]>(environment.apiUrl + 'contact/ContactCollection', { params: param });
  }

  InsertContatto(cc: ContactModel) {
    return this.store.pipe(select(getIdUser)
      , switchMap(id => {
        cc.IdUser = id;
        return this.http.post(environment.apiUrl + 'contact/Insert', cc, httpOptions);
      }));
  }
  UpdateContatto(cc: ContactModel) {
    return this.store.pipe(select(getIdUser)
      , switchMap(id => {
        cc.IdUser = id;
        return this.http.post(environment.apiUrl + 'contact/Update', cc, httpOptions)
      }));
  }
  DeleteContatto(idContact: number) {
    return this.store.pipe(select(getIdUser),
      switchMap(id => {
        return this.http.post(environment.apiUrl + 'contact/Delete', { pId: idContact, pIdUser: id } as ContactSearch, httpOptions)
      })
    );
  }
}
