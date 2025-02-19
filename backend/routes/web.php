<?php
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventoController;


Route::post('/event/store', [EventController::class, 'store']);
Route::get('/event/list', [EventoController::class, 'index']);