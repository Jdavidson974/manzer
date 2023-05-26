import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { DataState } from '../../state/datastate';
/**
 * Component for loading content asynchronously
 * ***
 * Constructor
 * @param {Router} router - Router to reload page on error
 * Inputs
 * @param {DataState} dataState - data state to observe
 * @param {TemplateRef} loadingTemplate (optionnel) - template to display on loading
 * @param {TemplateRef} errorTemplate (optionnel) - template to display on error
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass'],
})
export class LoadingComponent<T> implements OnInit {

  constructor(private router: Router) { }

  @Input() dataState!: DataState<T>;
  @Input() loadingTemplate?: TemplateRef<any>;
  @Input() errorTemplate?: TemplateRef<any>;


  loading$!: Observable<boolean>;
  value$!: Observable<T | null>;
  error$!: Observable<boolean>;
  errorMessage$!: Observable<string>

  ngOnInit(): void {
    this.loading$ = this.dataState.isLoading$;
    this.error$ = this.dataState.hasError$;
    this.errorMessage$ = this.dataState.msgError$;
  }

  reload(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
