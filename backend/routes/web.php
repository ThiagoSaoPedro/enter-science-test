<?php
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;



Route::post('/event/store', [EventController::class, 'store']);
Route::get('/event/list', [EventController::class, 'index']);