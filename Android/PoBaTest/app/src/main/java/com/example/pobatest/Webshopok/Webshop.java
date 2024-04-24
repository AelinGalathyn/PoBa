package com.example.pobatest.Webshopok;

import android.os.Parcel;
import android.os.Parcelable;

import androidx.annotation.NonNull;

import org.json.JSONException;
import org.json.JSONObject;

public class Webshop implements Parcelable {
    public Integer webshopid;
    private final String name;

    protected Webshop(Parcel in) {
        webshopid = (in.readByte() == 0) ? null : in.readInt();
        name = in.readString();
    }

    public static final Creator<Webshop> CREATOR = new Creator<Webshop>() {
        @Override
        public Webshop createFromParcel(Parcel in) {
            return new Webshop(in);
        }

        @Override
        public Webshop[] newArray(int size) {
            return new Webshop[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(@NonNull Parcel dest, int flags) {
        dest.writeByte((webshopid == null) ? (byte) 0 : (byte) 1); if (webshopid != null) dest.writeInt(webshopid);
        dest.writeString(name);
    }

    public Webshop(JSONObject object){

        try {
            webshopid = object.getInt("webshopid");
            name = object.getString("name");
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }

    public String getName() {
        return name;
    }
}
