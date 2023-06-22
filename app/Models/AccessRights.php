<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cookie;

class AccessRights extends Model
{
    use HasFactory;
    protected $table = 'cms_access_rights';
    protected $fillable = ['allow_edit','allow_view'];

    protected static function boot() {
        parent::boot();

        static::creating(function ($model) {
            
            $model->created_by = Cookie::get('user_id');
            $model->updated_by = NULL;
        });

        static::updating(function ($model) {
            $model->updated_by = Cookie::get('user_id');
        });
    }
    
}
