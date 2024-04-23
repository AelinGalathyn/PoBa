package com.example.pobatest.Rendeles;

import android.os.Parcel;
import android.os.Parcelable;

import org.json.JSONException;
import org.json.JSONObject;

public class RendelesTermek implements Parcelable {
    public Integer id;
    public String sku;
    public String name;
    public String unit;
    public Double qty;
    public Double net;
    public Integer gross;
    public String vat;
    public String status;

    public RendelesTermek(JSONObject object) throws JSONException {
        id = object.getInt("id");
        sku = object.getString("sku");
        name = object.getString("name");
        unit = object.getString("unit");
        qty = object.getDouble("quantity");
        net = object.getDouble("net");
        gross = object.getInt("gross");
        vat = object.getString("vat");
        status = object.getString("status");
    }

    protected RendelesTermek(Parcel in) {
        if (in.readByte() == 0) {
            id = null;
        } else {
            id = in.readInt();
        }
        sku = in.readString();
        name = in.readString();
        unit = in.readString();
        if (in.readByte() == 0) {
            qty = null;
        } else {
            qty = in.readDouble();
        }
        if (in.readByte() == 0) {
            net = null;
        } else {
            net = in.readDouble();
        }
        if (in.readByte() == 0) {
            gross = null;
        } else {
            gross = in.readInt();
        }
        vat = in.readString();
        status = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        if (id == null) {
            dest.writeByte((byte) 0);
        } else {
            dest.writeByte((byte) 1);
            dest.writeInt(id);
        }
        dest.writeString(sku);
        dest.writeString(name);
        dest.writeString(unit);
        if (qty == null) {
            dest.writeByte((byte) 0);
        } else {
            dest.writeByte((byte) 1);
            dest.writeDouble(qty);
        }
        if (net == null) {
            dest.writeByte((byte) 0);
        } else {
            dest.writeByte((byte) 1);
            dest.writeDouble(net);
        }
        if (gross == null) {
            dest.writeByte((byte) 0);
        } else {
            dest.writeByte((byte) 1);
            dest.writeInt(gross);
        }
        dest.writeString(vat);
        dest.writeString(status);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<RendelesTermek> CREATOR = new Creator<RendelesTermek>() {
        @Override
        public RendelesTermek createFromParcel(Parcel in) {
            return new RendelesTermek(in);
        }

        @Override
        public RendelesTermek[] newArray(int size) {
            return new RendelesTermek[size];
        }
    };
}
