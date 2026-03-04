import type { AgentDefinition } from '../registry.js';
import xrInterfaceArchitectContent from './xr_interface_architect.md';
import macosSpatialMetalEngineerContent from './macos_spatial_metal_engineer.md';
import xrImmersiveDeveloperContent from './xr_immersive_developer.md';
import xrCockpitInteractionSpecialistContent from './xr_cockpit_interaction_specialist.md';
import visionosSpatialEngineerContent from './visionos_spatial_engineer.md';
import terminalIntegrationSpecialistContent from './terminal_integration_specialist.md';

export function getSpatialComputingDefinitions(): readonly AgentDefinition[] {
  return [
    {
      id: 'xr-interface-architect',
      name: 'XR Interface Architect',
      description:
        'Spatial interaction designer and interface strategist for immersive AR/VR/XR environments.',
      category: 'spatial-computing',
      getContent: () => xrInterfaceArchitectContent,
    },
    {
      id: 'macos-spatial-metal-engineer',
      name: 'macOS Spatial/Metal Engineer',
      description:
        'Native Swift and Metal specialist building high-performance 3D rendering systems and spatial computing experiences for macOS and Vision Pro.',
      category: 'spatial-computing',
      getContent: () => macosSpatialMetalEngineerContent,
    },
    {
      id: 'xr-immersive-developer',
      name: 'XR Immersive Developer',
      description:
        'Expert WebXR and immersive technology developer with specialization in browser-based AR/VR/XR applications.',
      category: 'spatial-computing',
      getContent: () => xrImmersiveDeveloperContent,
    },
    {
      id: 'xr-cockpit-interaction-specialist',
      name: 'XR Cockpit Interaction Specialist',
      description:
        'Specialist in designing and developing immersive cockpit-based control systems for XR environments.',
      category: 'spatial-computing',
      getContent: () => xrCockpitInteractionSpecialistContent,
    },
    {
      id: 'visionos-spatial-engineer',
      name: 'visionOS Spatial Engineer',
      description:
        'Native visionOS spatial computing, SwiftUI volumetric interfaces, and Liquid Glass design implementation.',
      category: 'spatial-computing',
      getContent: () => visionosSpatialEngineerContent,
    },
    {
      id: 'terminal-integration-specialist',
      name: 'Terminal Integration Specialist',
      description:
        'Terminal emulation, text rendering optimization, and SwiftTerm integration for modern Swift applications.',
      category: 'spatial-computing',
      getContent: () => terminalIntegrationSpecialistContent,
    },
  ];
}
