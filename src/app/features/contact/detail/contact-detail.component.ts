import { AfterViewInit, ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { ContactModel } from 'src/app/core/component/contact/model/contactModel';
import { MailModel } from 'src/app/core/component/contact/model/mailModel';
import { AdministrativeAreaService } from 'src/app/core/component/contact/service/adminstrativeArea.service';
import { toastFailure, toastSuccess } from 'src/app/core/component/store/toaster/toaster.actions';
import { AddressModel } from './../../../core/component/contact/model/addressModel';
import { PhoneModel } from './../../../core/component/contact/model/phoneModel';
import { ContactService } from './../../../core/component/contact/service/contact.service';
import { DcontactService } from './../../../core/component/contact/service/dcontact.service';
import { DIsoService } from './../../../core/component/contact/service/diso.service';
import { DLabelAddressService } from './../../../core/component/contact/service/dlabelAddress.service';
import { DmailService } from './../../../core/component/contact/service/dmail.service';
import { DPhoneService } from './../../../core/component/contact/service/dphone.service';

function cfValidator(control: AbstractControl): { [key: string]: any } {
  if (!control.parent) { return null; }

  if (control.value === null && control.parent.get('TyContact').value === 1) {
    return Validators.required(control);
  }
  if (control.value !== null && (control.parent.get('TyContact').value === 1)) {
    const r = new RegExp('(?:[A-Z][AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]');
    const wrong = !r.test(control.value);
    return wrong ? { CodiceFiscaleErrato: { value: control.value } } : null;
  }
  return null;
}

function sureNameValidator(control: AbstractControl): { [key: string]: any } {
  if (!control.parent) { return null; }

  if (control.value === null && control.parent.get('TyContact').value === 1) {
    return Validators.required(control);
  }
  return null;
}
function nameValidator(control: AbstractControl): { [key: string]: any } {
  if (!control.parent) { return null; }

  if (control.value === null && control.parent.get('TyContact').value === 1) {
    return Validators.required(control);
  }
  return null;
}

function businessNameValidator(control: AbstractControl): { [key: string]: any } {
  if (!control.parent) { return null; }

  if (control.value === null && control.parent.get('TyContact').value !== 1) {
    return Validators.required(control);
  }
  return null;
}

function phoneValidator(control: AbstractControl): { [key: string]: any } | null {
  if (!control.parent) { return null; }

  if (control.value !== null && control.parent.get('DPhone.Regex').value !== null) {
    const r = new RegExp(control.parent.get('DPhone.Regex').value);

    const wrong = !r.test(control.value);
    return wrong ? { FormatoErrato: { value: control.value } } : null;
  }
  return null;
}

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styles: [``],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContactDetailComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ContactDetailComponent),
      multi: true
    }
  ]
})
export class ContactDetailComponent implements OnInit, OnDestroy, ControlValueAccessor, AfterViewInit {
  subscriptions = new Subscription();
  @Input() showControlPanel: boolean = true;
  @Input() showOnlyComponent: boolean = false;

  mailCollapsed: boolean;
  phoneCollapsed: boolean;
  addressCollapsed: boolean;
  frmContactCollapsed: boolean;
  showBtnDelete: boolean;

  frmContact: FormGroup;
  frmMailList: FormArray;
  frmAddressList: FormArray;
  frmPhoneList: FormArray;
  contactModel: ContactModel;
  faWhatsapp = faWhatsapp;
  onTouched: any = () => { };
  onChange: any = () => { };

  dContact$ = this.dContatctService.DContactCollection({}).pipe(shareReplay(1));
  dIso$ = this.dIsoService.DIsoCollection({}).pipe(shareReplay(1));
  administrativeArea$ = this.administrativeService.AdminstrativeAreaCollection({}).pipe(shareReplay(1));
  dMail$ = this.dMailService.DMailCollection({}).pipe(shareReplay(1));
  dPhone$ = this.dPhoneService.DPhoneCollection({}).pipe(shareReplay(1));
  dLabelAddress$ = this.dLabelAddressService.DLabelAddressCollection({}).pipe(shareReplay(1));

  get MailCollection() {
    return this.frmContact.controls.MailCollection as FormArray;
  }
  get AddressCollection() {
    return this.frmContact.controls.AddressCollection as FormArray;
  }
  get PhoneCollection() {
    return this.frmContact.controls.PhoneCollection as FormArray;
  }

  get value(): ContactModel {
    return this.frmContact.getRawValue();
  }
  set value(value: ContactModel) {
    console.log('set value contact:', value)
    this.contactModel = value;
    this.valorizzaForm();
    this.onChange(value);
    this.onTouched();
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.frmContact.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  constructor(private contactService: ContactService, private dContatctService: DcontactService, private dIsoService: DIsoService,
    private route: ActivatedRoute, private router: Router, private store: Store<AppState>, private cdref: ChangeDetectorRef,
    private administrativeService: AdministrativeAreaService, private dMailService: DmailService, private dPhoneService: DPhoneService,
    private dLabelAddressService: DLabelAddressService, private fb: FormBuilder
  ) {
    this.frmContact = this.fb.group({
      TyContact: [null, Validators.required],
      Id: [null],
      SurName: [null, sureNameValidator],
      Name: [null, nameValidator],
      BusinessName: [null, businessNameValidator],
      // TySex: [this.contactModel?],
      CdFiscale: [null, cfValidator],
      PartitaIva: [null],
      TyIso: [null, Validators.required],
      IdAdministrativeArea: [null, Validators.required],
      DtBirth: [null],
      WebSite: [null],
      DIso: this.fb.group({
        Code: [null],
        Label: [null],
        Id: [null],
      }),
      AdministrativeArea: this.fb.group({
        Id: [null],
        DsAdministrativeArea: [null],
        District: [null],
        Cap: [this.contactModel?.AdministrativeArea.Cap],
        CdCatasto: [null],
        CdIstat: [null],
        IdRegion: [null],
        DRegion: fb.group({
          Id: [null],
          Label: [null],
        }),
      }),

      MailCollection: this.fb.array([]),
      AddressCollection: this.fb.array([]),
      PhoneCollection: this.fb.array([]),
    });

    this.subscriptions.add(
      // any time the inner form changes update the parent of any change
      this.frmContact.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngAfterViewInit(): void {
    this.cdref.detectChanges();
    const surName = this.frmContact.get('SurName');
    const nsme = this.frmContact.get('Name');
    const rg = this.frmContact.get('BusinessName');
    const tc = this.frmContact.get('TyContact');

    this.subscriptions.add(surName.valueChanges.subscribe(v => rg.setValue(v?.trim() + ' ' + nsme?.value?.trim())));
    this.subscriptions.add(nsme.valueChanges.subscribe(v => rg.setValue(surName?.value?.trim() + ' ' + v?.trim())));
    this.subscriptions.add(tc.valueChanges.subscribe(v => this.frmContact.get('CdFiscale').updateValueAndValidity()));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  ngOnInit(): void {
    this.route.params.pipe(
      filter(p => +p.Id > 0 && this.router.url.includes('Contact')),
      switchMap((p: Params) => {
        console.log(this.router.url)
        const id: number = +p.Id;
        this.showBtnDelete = true;
        this.frmContact.controls.Id.setValidators([Validators.required])
        return this.contactService.ContactById(id).pipe(shareReplay(1));
      })).subscribe(c => {
        this.contactModel = c;
        this.valorizzaForm();
      }
      )
  }

  private valorizzaForm() {
    this.frmContact.patchValue(this.contactModel)
    this.MailCollection.clear();
    this.AddressCollection.clear();
    this.PhoneCollection.clear();

    this.contactModel?.MailCollection?.forEach(e => this.MailCollection.push(this.createMailRow(e)));
    this.contactModel?.AddressCollection?.forEach(e => this.AddressCollection.push(this.createAddressRow(e)));

    this.contactModel?.PhoneCollection?.forEach((v, i) => {
      this.PhoneCollection.push(this.createPhoneRow(v));
    })
  }

  btnSalvaOnClick(e: Event) {
    if (!this.frmContact.controls.Id.value) {
      this.subscriptions.add(
        this.contactService.InsertContatto(this.frmContact.value as ContactModel).subscribe(
          respose => {
            this.store.dispatch(toastSuccess({ title: null, message: "Salvataggio avvenuto correttamente." }))
            this.resetForm();
          },
          error => {
            this.store.dispatch(toastFailure({
              title: null,
              message: `Il salvataggio ha generato un errore.</br>Se l\'errore persiste contattare l\'amministatore.</br></br><b>[${error.message}]</b>`
            }))
          }
        ));
    }
    else {
      this.subscriptions.add(
        this.contactService.UpdateContatto(this.frmContact.value as ContactModel).subscribe(
          respose => { this.store.dispatch(toastSuccess({ title: null, message: "Aggiornamento avvenuto correttamente." })) },
          (error) => {
            this.store.dispatch(toastFailure({
              title: null,
              message: `Il salvataggio ha generato un errore.</br>Se l\'errore persiste contattare l\'amministatore.</br></br><b>[${error.message}]</b>`
            }))
          }
        ));
    }
  }

  private resetForm() {
    this.frmContact.reset();
    this.MailCollection.clear();
    this.PhoneCollection.clear();
    this.AddressCollection.clear();
  }

  btnAnnullaOnClick(e: Event) {
    e.preventDefault();
    this.resetForm();
    this.router.navigate(['.'], { relativeTo: this.route.parent });
  }

  btnEliminaOnClick(e: Event) {
    this.subscriptions.add(this.contactService.DeleteContatto(this.frmContact.get('Id').value).subscribe(respose => {
      this.store.dispatch(toastSuccess({ title: null, message: "Salvataggio avvenuto correttamente." }));
      this.resetForm();
    },
      (error) => {
        this.store.dispatch(toastFailure({
          title: null,
          message: `Il salvataggio ha generato un errore.</br>Se l\'errore persiste contattare l\'amministatore.</br></br><b>[${error.message}]</b>`
        }))
      }
    ));
  }

  addMail(e: Event) {
    e.preventDefault();
    this.MailCollection.push(this.createMailRow())
  }
  addPhone(e: Event) {
    e.preventDefault();
    this.PhoneCollection.push(this.createPhoneRow())
  }
  addAddress(e: Event) {
    e.preventDefault();
    this.AddressCollection.push(this.createAddressRow())
  }

  removeMail(e: Event, i: number) {
    e.preventDefault();
    this.MailCollection.removeAt(i)
  }
  removePhone(e: Event, i: number) {
    e.preventDefault();
  }
  removeAddress(e: Event, i: number) {
    e.preventDefault();
    this.AddressCollection.removeAt(i)
  }

  getMailFormGroup(index): FormGroup {
    this.frmMailList = this.frmContact.controls.MailCollection as FormArray;
    return this.frmMailList.controls[index] as FormGroup;
  }
  getAddressFormGroup(index): FormGroup {
    this.frmAddressList = this.frmContact.controls.AddressCollection as FormArray;
    return this.frmAddressList.controls[index] as FormGroup;
  }
  getPhoneFormGroup(index): FormGroup {
    this.frmPhoneList = this.frmContact.controls.PhoneCollection as FormArray;
    return this.frmPhoneList.controls[index] as FormGroup;
  }

  mailToggle(e: Event) {
    e.preventDefault();
    this.mailCollapsed = !this.mailCollapsed;
  }
  addressToggle(e: Event) {
    e.preventDefault();
    this.addressCollapsed = !this.addressCollapsed;
  }
  phoneToggle(e: Event) {
    e.preventDefault();
    this.phoneCollapsed = !this.phoneCollapsed;
  }

  createMailRow(mm?: MailModel): FormGroup {
    return this.fb.group({
      Id: [mm?.Id],
      TyMail: [mm?.TyMail],
      Email: [mm?.EMail, [Validators.required, Validators.email]],
      FlPec: [mm?.FlPec],
      IdContact: [mm ? mm.IdContact : this.contactModel?.Id],
    });
  }
  createPhoneRow(pm?: PhoneModel): FormGroup {
    return this.fb.group({
      Id: [pm?.Id],
      TyPhone: [pm?.TyPhone],
      DPhone: this.fb.group({
        Id: [pm?.DPhone?.Id],
        Label: [pm?.DPhone?.Label],
        Regex: [pm?.DPhone?.Regex],
      }),
      NrPhone: [pm?.NrPhone, phoneValidator],
      IdContact: [pm ? pm.IdContact : this.contactModel?.Id],
    });
  }
  createAddressRow(am?: AddressModel): FormGroup {
    return this.fb.group({
      Id: [am?.Id],
      TyLabel: [am?.TyLabel],
      DLabelAddress: [am?.DLabelAddress],
      DsAddress: [am?.DsAddress],
      IdAdministrativeArea: [am?.IdAdministrativeArea],
      AdministrativeArea: this.fb.group({
        Id: [am?.AdministrativeArea.Id],
        DsAdministrativeArea: [am?.AdministrativeArea.DsAdministrativeArea],
        District: [am?.AdministrativeArea.District],
        Cap: [am?.AdministrativeArea.Cap],
        CdCatasto: [am?.AdministrativeArea.CdCatasto],
        CdIstat: [am?.AdministrativeArea.CdIstat],
        IdRegion: [am?.AdministrativeArea.IdRegion],
        DRegion: this.fb.group({
          Id: [am?.AdministrativeArea.DRegion.Id],
          Label: [am?.AdministrativeArea.DRegion.Label],
        }),
      }),
      Latitude: [am?.Latitude],
      Longitude: [am?.Longitude],
      IdContact: [am ? am.IdContact : this.contactModel?.Id],
    });
  }

  onChangeAdministrativeAreaAddress(e, i) {
    if (!e) return;
    const fg = this.getAddressFormGroup(i);
    fg.get('AdministrativeArea.District').setValue(e.District);
    fg.get('AdministrativeArea.Cap').setValue(e.Cap);

    if (fg.get('AdministrativeArea.Cap').value.indexOf('x') > 0) { fg.get('AdministrativeArea.Cap').enable(); }
    else { fg.get('AdministrativeArea.Cap').disable(); }

    fg.get('AdministrativeArea.CdIstat').setValue(e.CdIstat);
    fg.get('AdministrativeArea.DRegion.Label').setValue(e.DRegion.Label);
  }

  onClearAdministrativeAreaAddress(e, i) {
    const fg = this.getAddressFormGroup(i);
    fg.get('AdministrativeArea.District').reset();
    fg.get('AdministrativeArea.Cap').reset();
    fg.get('AdministrativeArea.CdIstat').reset();
    fg.get('AdministrativeArea.DRegion.Label').reset();
  }

  onChangeTyPhone(e, i) {
    const fg = this.getPhoneFormGroup(i);
    fg.get('DPhone.Regex').setValue(e.Regex);
    fg.get('NrPhone').updateValueAndValidity();
  }

  onClearTyPhone(e, i) {
    const fg = this.getPhoneFormGroup(i);
    fg.get('DPhone.Regex').reset();
  }

  onChangeAdministrativeArea(e) {
    if (!e) return;
    this.frmContact.get('AdministrativeArea.District').setValue(e.District);
    this.frmContact.get('AdministrativeArea.Cap').setValue(e.Cap);

    if (this.frmContact.get('AdministrativeArea.Cap').value.indexOf('x') > 0) { this.frmContact.get('AdministrativeArea.Cap').enable(); }
    else { this.frmContact.get('AdministrativeArea.Cap').disable(); }

    this.frmContact.get('AdministrativeArea.CdIstat').setValue(e.CdIstat);
    this.frmContact.get('AdministrativeArea.DRegion.Label').setValue(e.DRegion.Label);
  }

  writeValue(value: any): void {
    if (value) this.value = value;

    if (value === null) this.frmContact.reset();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // communicate the inner form validation to the parent form
  validate(_: FormControl) {
    return this.frmContact.valid ? null : { profile: { valid: false } };
  }

}
