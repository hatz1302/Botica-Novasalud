import React, { useState, useEffect } from 'react';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  const cargarInventario = () => {
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error cargando inventario:", err));
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  const agregarVenta = (prod) => {
    if (prod.stock <= 0) {
      alert("No hay existencias de este medicamento");
      return;
    }
    setCarrito([...carrito, prod]);
    setTotal(prev => prev + prod.precio);
  };

  const procesarCobro = () => {
    alert(`Venta registrada exitosamente por S/ ${total.toFixed(2)}`);
    setCarrito([]);
    setTotal(0);
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', backgroundColor: '#f1f5f9', color: '#0f172a', minHeight: '100vh', padding: '24px', boxSizing: 'border-box' }}>
      
      {/* Encabezado */}
      <header style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '18px 24px', borderRadius: '10px', marginBottom: '24px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>🏥 Botica Nova Salud - Sistema de Gestión</h1>
        <p style={{ margin: '6px 0 0 0', fontSize: '14px', opacity: 0.9 }}>Control de Inventario en Tiempo Real y Punto de Venta (POS)</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Panel Izquierdo: Catálogo y Alertas */}
        <section style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '19px', marginTop: 0, marginBottom: '16px', color: '#0f172a', fontWeight: '600' }}>
            Inventario de Medicamentos
          </h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '12px 10px', color: '#334155', fontWeight: 'bold' }}>Medicamento</th>
                <th style={{ padding: '12px 10px', color: '#334155', fontWeight: 'bold' }}>Categoría</th>
                <th style={{ padding: '12px 10px', color: '#334155', fontWeight: 'bold' }}>Precio</th>
                <th style={{ padding: '12px 10px', color: '#334155', fontWeight: 'bold' }}>Stock</th>
                <th style={{ padding: '12px 10px', color: '#334155', fontWeight: 'bold' }}>Alerta</th>
                <th style={{ padding: '12px 10px', color: '#334155', fontWeight: 'bold', textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => {
                const stockCritico = p.stock <= p.stockMinimo;
                return (
                  <tr key={p._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 10px', fontWeight: '600', color: '#0f172a' }}>{p.nombre}</td>
                    <td style={{ padding: '12px 10px', color: '#475569' }}>{p.categoria}</td>
                    <td style={{ padding: '12px 10px', color: '#0f172a', fontWeight: '500' }}>S/ {p.precio.toFixed(2)}</td>
                    <td style={{ padding: '12px 10px', color: '#0f172a', fontWeight: '600' }}>{p.stock}</td>
                    <td style={{ padding: '12px 10px' }}>
                      {stockCritico ? (
                        <span style={{ backgroundColor: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5', padding: '5px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                          ⚠️ Reponer Stock
                        </span>
                      ) : (
                        <span style={{ backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #86efac', padding: '5px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                          Normal
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                      <button 
                        onClick={() => agregarVenta(p)}
                        style={{ backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '7px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                        + Vender
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Panel Derecho: Punto de Venta */}
        <section style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '19px', marginTop: 0, marginBottom: '16px', color: '#0f172a', fontWeight: '600' }}>
            🛒 Detalle de Venta
          </h2>
          
          {carrito.length === 0 ? (
            <p style={{ color: '#64748b', fontSize: '14px', margin: '20px 0' }}>No hay productos seleccionados.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {carrito.map((item, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed #cbd5e1', color: '#0f172a' }}>
                  <span>{item.nombre}</span>
                  <strong>S/ {item.precio.toFixed(2)}</strong>
                </li>
              ))}
            </ul>
          )}

          <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>
            <span>Total:</span>
            <span style={{ color: '#16a34a' }}>S/ {total.toFixed(2)}</span>
          </div>

          <button 
            onClick={procesarCobro}
            disabled={carrito.length === 0}
            style={{ width: '100%', marginTop: '20px', backgroundColor: carrito.length === 0 ? '#94a3b8' : '#16a34a', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontSize: '15px', fontWeight: 'bold', cursor: carrito.length === 0 ? 'not-allowed' : 'pointer' }}>
            Registrar Venta
          </button>
        </section>

      </div>
    </div>
  );
}

export default App;