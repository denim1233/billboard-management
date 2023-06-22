<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cookie;

class TypeSize extends Model
{
    use HasFactory;

    // protected $guarded = [];

    protected $table = 'cms_type_size';
    
    protected $fillable = ['type_id','length','width','uom_id','status_id'];

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
