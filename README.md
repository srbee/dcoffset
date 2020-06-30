# dcoffset
Plotting dc offset in fault current interactively in p5.js
When there is a switching in an inductive circuit, the transient current can have substantial dc offet depending upon the switching instant.
If the angle at which switching takes places matchs the power factor angle , there is no dc offset.
Switchig angle is not controllable, making the resulting dc offset unpredictable.
v(t) = Vm sin(w t + alpha) : Models the switching at any point on voltage wave using 'alpha' as the switcing angle

iac_steady_state(t)= (Vm/Z) sin(w t +alpha - theta ) : theta = atan2(w L , R ) : pf angle

idc(t) = (Vm/Z) exp(-t/tau) sin(alpha-theta)

i(t) = iax_steady_state(t) - idc(t)

i(t)= (Vm/Z) sin(w t + alpha - theta ) - (Vm/Z) exp(-t/tau) sin(alpha-theta)
