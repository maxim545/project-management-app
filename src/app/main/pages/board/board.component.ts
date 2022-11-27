import {
  Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  catchError, map, skipWhile, take,
} from 'rxjs/operators';
import { IBoard, IColumn, ITask } from 'src/app/core/models/board.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ColumnState } from 'src/app/core/store/reducers/columns.reducers';
import { getAllColumns } from 'src/app/core/store/selectors/columns.selectors';
import { getAllBoards, selectEntity } from 'src/app/core/store/selectors/boards.selectors';
import { BoardState, boardStateSelector } from 'src/app/core/store/reducers/boards.reducer';
import { getUsers } from 'src/app/core/store/selectors/user.selectors';
import { IUser } from 'src/app/core/models/user.model';
import {
  CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule,
} from '@angular/cdk/drag-drop';
import { parseJwt } from 'src/app/core/utils/tokenParse';
import { loadPoints } from 'src/app/core/store/actions/points.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarRedConfig } from 'src/app/core/configs/snackBar.configs';
import { LangService } from 'src/app/core/services/lang/lang.service';
import { trnsttValues } from 'src/app/core/configs/lang';
import { clearColumns, loadColumns } from '../../../core/store/actions/columns.actions';
import { ColumnsService } from '../../services/columns/columns.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  boardId: string = this.actRouter.snapshot.paramMap.get('id') || '';

  users$: Observable<IUser[] | null> = this.store.select(getUsers);

  board$: Observable<IBoard>;

  columns$: Observable<IColumn[]>;

  constructor(
    private actRouter: ActivatedRoute,
    private store: Store,
    private columnsService: ColumnsService,
    private columnStore: Store<ColumnState>,
    private boardStore: Store<BoardState>,
    private router: Router,
    private snackBar: MatSnackBar,
    private langService: LangService,
  ) {
    this.board$ = this.boardStore.pipe(
      select(boardStateSelector),
      skipWhile((flag) => !flag.isLoggedIn),
      take(1),
      select(selectEntity(this.boardId)),
      map((board) => {
        if (board) {
          const userId = parseJwt(localStorage.getItem('uniq_token'));
          this.store.dispatch(loadColumns({ id: this.boardId }));
          this.store.dispatch(loadPoints({ userId }));
          return board;
        }
        this.router.navigate(['**']);
        const curLng = this.langService.getCurrentLanguage();
        this.snackBar.open(trnsttValues[curLng as keyof typeof trnsttValues].board.notValid, '', snackBarRedConfig);
        throw new Error('Board ID is not valid');
      }),
    );
    this.columns$ = this.columnStore.pipe(
      select(getAllColumns),
      map((columns) => JSON.parse(JSON.stringify(columns))),
    );
  }

  ngOnInit(): void {
  }

  dropColumn(event: CdkDragDrop<IColumn[]>, columns: IColumn[]): void {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(columns, event.previousIndex, event.currentIndex);
      columns.forEach((column, i) => column.order = i);
      this.columnsService.editSetColumns(columns);
    }
  }

  ngOnDestroy() {
    this.store.dispatch(clearColumns());
  }
}
